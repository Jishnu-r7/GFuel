import cv2
from flask import Flask, request, render_template, jsonify
import yolov5
import pytesseract
import easyocr
from processNumber import processNumber

app = Flask(__name__, template_folder='')


model = yolov5.load('best.pt', device='cpu')  # loading model
model.conf = 0.25  # NMS confidence threshold
model.iou = 0.45  # NMS IoU threshold
model.agnostic = False  # NMS class-agnostic
model.multi_label = False  # NMS multiple labels per box
model.max_det = 2  # maximum number of detections per image

reader = easyocr.Reader(['en'])

def process_text(string):
    new_string=""
    for i in string:
        if i.isalnum():
            new_string+=i
    return new_string

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    
    # Save the uploaded file
    file_path = 'uploads/' + file.filename
    file.save(file_path)
    
    # Perform inference
    results = model(file_path, size=640)
    
    # Extract text using TesseractOCR
    img = cv2.imread(file_path)
    predictions = results.pred[0]
    textTesseract = []
    textEasyOCR = []  # Create a list to store text values
    sorted(predictions, key=lambda x: x[4], reverse=True) #sorting to ensure that the bounding box with most confidence is taken
    results.save(save_dir='static/results/'+file.filename)
    
    prediction = predictions[0]
    
    coordinates = prediction[:4]
    x1, y1, x2, y2 = coordinates
    # Ensure coordinates are within image boundaries
    x1, y1 = max(0, int(x1)), max(0, int(y1))
    x2, y2 = min(img.shape[1], int(x2)), min(img.shape[0], int(y2))

    cropped_image = img[y1:y2, x1:x2]
    
    #pytesseract
    text = pytesseract.image_to_string(cropped_image)
    textTesseract.append(text) 

    #easyOCR
    text1 = reader.readtext(cropped_image)
    textEasyOCR.append(text1[0][1])
    
    print("pytesseract: ",end="")
    print(textTesseract)
    if textTesseract[0]!='':
        print(process_text(textTesseract[0]))
        
    print("easyocr: ",end="")
    print(textEasyOCR)
    if textEasyOCR[0]!='':
        print(process_text(textEasyOCR[0]))

    # Save the results
    results.save(save_dir='static/results/'+file.filename)

    #predictions_with_texts = [(prediction, text) for prediction, text in zip(predictions, textTesseract)]
    #return render_template('result.html', image_path='static/results/'+file.filename+'/'+file.filename, predictions_with_texts=predictions_with_texts)

    if textTesseract[0]!= '':
        detected_number = process_text(textTesseract[0]) if textTesseract and textTesseract[0] else 'NO PLATE'
    else:
        detected_number = process_text(textEasyOCR[0]) if textEasyOCR and textEasyOCR[0] else 'NO PLATE'
    if detected_number!='NO PLATE':
        detected_number = detected_number.upper()
        detected_number = processNumber(detected_number)

    return jsonify({'detectedNumber': detected_number})

if __name__ == '__main__':
    app.run(debug=True)
