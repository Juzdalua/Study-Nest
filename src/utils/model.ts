import commonResponse from "./commonResponse";

// Change upperCase to camelCase
export const toCamelCase = (object: any) => {
    let newObject: any = {}
    var keys = Object.keys(object);
    const toCamelCase = (message: string) => {
        message = message.toLowerCase()
        message = message.replace(/-/gi, " ")
        message = message.replace(/_/gi, " ")
        let messages = message.split(" ").map((e, i) => {
            if (i > 0) {
                e = e.substring(0, 1).toUpperCase() + e.substring(1)
            }
            return e
        })
        return messages.join("")
    }
    for (let i = 0; i < keys.length; i++) {
        newObject[toCamelCase(keys[i])] = object[keys[i]];
    }
    return newObject
};

// Check address 40words with regexp
const addressReg = (addressSubstr: string) => {
    const regex:RegExp = /[0-9a-fA-F]{40}/g;     
    const okReg = regex.exec(addressSubstr);

    if(okReg === null)
        return commonResponse.error("Address type is not correct.");
    else
        return true;
};

// Validate address
export const addressValidator = (address: string) => {    
    const addressLength = address.length;

    if(addressLength !== 40 && addressLength !== 42){
        return commonResponse.error("Address type is not correct.");
    } else if(addressLength === 42){
        const ok0x = address.substring(0,2) === "0x" ? true : false;
        if(!ok0x)
            return commonResponse.error("Address type is not correct.");
        
        return addressReg(address.substring(2));        
    } else{
        return addressReg(address);
    } //if
};


export const currentDate = ():string => {
    const date = new Date();
    return `${(date.getFullYear())}-${(date.getMonth() + 1)}-${(date.getDate())}`
}