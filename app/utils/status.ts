const initState = {
    NO_DATE_IS_QUERY:'NO_DATE_IS_QUERY'  //没有查询到数据
}

/**
 * 
 * @param status 状态码
 * @param state  默认传出值(可在initState中添加)
 */
export default function Rtstatus(status,state = initState){
    switch(status){
        case 200:
        return onSuccess(status)
        case 404:
        return onFalied(status,state)
    }
}

const onSuccess = (_status) =>{
    return {
        status:'Success'
    }
}

const onFalied = (_status,state) =>{
    return {
        status:'Failed',
        failure_reason:state.NO_DATE_IS_QUERY
    }
}