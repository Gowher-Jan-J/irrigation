


export const isDataInvalid = async (data) => {
    if (data == null || data == undefined || data.length == 0 || Object.keys(data).length == 0) {
        return data;
    }
}


export const isDataValid = async (data) => {
    if (data != null && data != undefined && data.length != 0 && Object.keys(data).length != 0) {
        return data;
    }
}

export const isUpdated = async (data) => {
    if (data[0] != 0 && data != null && data != undefined) {
        return data;
    }
}

// export const isDeleted = async (data) => {
//     if (data != null && data != undefined && data.length != 0 && Object.keys(data).length != 0) {
//         return data;
//     }
// }

