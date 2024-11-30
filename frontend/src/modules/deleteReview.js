import {getFetchData} from "./utils";

export default async (id) => {
    return getFetchData(`simples/delete/${id}`, 'POST');
}