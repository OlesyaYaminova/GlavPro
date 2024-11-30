import {getFetchData} from "./utils";

export default async (id, updateData) => {
    return getFetchData(`simples/update/${id}`, 'POST', updateData);
}