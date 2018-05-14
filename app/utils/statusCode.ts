/**
 * 状态原因合集
 */
const statusCode = {
    NO_DATE_IS_QUERY:'无数据',  //没有查询到数据
    PHONE_IS_EXISTED:'手机号已存在',
    RECEIVE_ADDRESS_EXISTED:'空投地址已存在',
    RANDOM_IS_EXISTED:'邀请码已存在',
    SMS_IS_OFTEN:'请勿频繁操作',
    VERIFICATION_IS_ERROR:'验证码错误',
    VERIFICATION_IS_INVALID:'验证码失效',
    RANDOM_IS_NOTEXISTED:'无效邀请码'
}

export default statusCode;