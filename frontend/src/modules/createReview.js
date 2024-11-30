import {getFetchData} from "./utils";

export default async (createData) => {
    return getFetchData(`simples/create`, 'POST', createData);
}