import { fetchingData } from '../utils/utils';
import { getStandListRequest, getMirrorsListRequest} from '../api/defaultConfiguration';

export async function getStandList(id: string) {
    let result;
    return fetchingData(() => getStandListRequest(id)).then(res => {
        return result = res;
        
    })
    .catch(error => {
        return result = error.message;
    })
}

export async function getMirrorsList(id: string) {
    let result;
    return fetchingData(() => getMirrorsListRequest(id)).then(res => {
        return result = res;
    })
    .catch(error => {
        return result = error.message;
    })
}
