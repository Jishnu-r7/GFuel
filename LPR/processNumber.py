def processNumber(licensePlate):
    licensePlate = licensePlate.strip()
    licensePlate = licensePlate.replace(" ", "")

    if licensePlate.startswith("IND"):
        licensePlate = licensePlate[3:]
    elif licensePlate.startswith("IN"):
        licensePlate = licensePlate[2:]
    elif licensePlate.startswith("ND"):
        licensePlate = licensePlate[2:]
    elif licensePlate.startswith("I"):
        licensePlate = licensePlate[1:]


    for i in range (2):
        if licensePlate[i].isdigit():
            if licensePlate[i]=="0":
                licensePlate = licensePlate[:i] + "O" + licensePlate[i+1:]
            elif licensePlate[i] == "3" or licensePlate[i] == "8":
                licensePlate = licensePlate[:i] + "B" + licensePlate[i+1:]
            elif licensePlate[i] == "5":
                licensePlate = licensePlate[:i] + "S" + licensePlate[i+1:]
            elif licensePlate[i] == "2":
                licensePlate = licensePlate[:i] + "Z" + licensePlate[i+1:]
            elif licensePlate[i] == "1":
                licensePlate = licensePlate[:i] + "I" + licensePlate[i+1:]
    
    for i in range (2,4):
        if licensePlate[i].isalpha():
            if licensePlate[i]=="O":
                licensePlate = licensePlate[:i] + "0" + licensePlate[i+1:]
            elif licensePlate[i] == "B":
                licensePlate = licensePlate[:i] + "8" + licensePlate[i+1:]
            elif licensePlate[i] == "S":
                licensePlate = licensePlate[:i] + "5" + licensePlate[i+1:]
            elif licensePlate[i] == "Z":
                licensePlate = licensePlate[:i] + "2" + licensePlate[i+1:]
            elif licensePlate[i] == "I":
                licensePlate = licensePlate[:i] + "1" + licensePlate[i+1:]
    
    if licensePlate[i].isalpha():
        if licensePlate[4]=="0":
            licensePlate = licensePlate[:4] + "O" + licensePlate[5:]
        elif licensePlate[4] == "3" or licensePlate[i] == "8":
            licensePlate = licensePlate[:4] + "B" + licensePlate[5:]
        elif licensePlate[4] == "5":
            licensePlate = licensePlate[:4] + "S" + licensePlate[5:]
        elif licensePlate[i] == "2":
            licensePlate = licensePlate[:i] + "Z" + licensePlate[i+1:]
        elif licensePlate[i] == "1":
            licensePlate = licensePlate[:i] + "I" + licensePlate[i+1:]
    
    k=len(licensePlate)-1
    if licensePlate[k].isalpha():
        if licensePlate[k]=="O":
            licensePlate = licensePlate[:k] + "0"
        elif licensePlate[k] == "B":
            licensePlate = licensePlate[:k] + "8"
        elif licensePlate[k] == "S":
            licensePlate = licensePlate[:k] + "5"
        elif licensePlate[k] == "Z":
            licensePlate = licensePlate[:k] + "2"
        elif licensePlate[k] == "I":
            licensePlate = licensePlate[:k] + "1"

    for i in range (len(licensePlate)-2 , len(licensePlate)-5, -1):
        if licensePlate[i].isalpha():
            if licensePlate[i]=="O":
                licensePlate = licensePlate[:i] + "0" + licensePlate[i+1:]
            elif licensePlate[i] == "B":
                licensePlate = licensePlate[:i] + "8" + licensePlate[i+1:]
            elif licensePlate[i] == "S":
                licensePlate = licensePlate[:i] + "5" + licensePlate[i+1:]
            elif licensePlate[i] == "Z":
                licensePlate = licensePlate[:i] + "2" + licensePlate[i+1:]
            elif licensePlate[i] == "I":
                licensePlate = licensePlate[:i] + "1" + licensePlate[i+1:]
    return licensePlate
