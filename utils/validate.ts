// copy by https://any86.github.io/any-rule/

/**
 * @description 判断是否是邮箱
 * @param value
 * @returns {boolean}
 */
export function isEmail(value: string) {
    //支持中文邮箱：/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}

/**
 * @description 判断是否是手机号(宽松型), 只要是13,14,15,16,17,18,19开头即可
 * @param value
 * @returns {boolean}
 */
export function isPhone(value: string | number) {
    //严谨型（根据工信部2019年最新公布的手机号段）：/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value?.toString())
}

/**
 * @description 判断是否是身份证号, 支持1/2代(15位/18位数字)
 * @param value
 * @returns {boolean}
 */
export function isIdCard(value: string | number) {
    return /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/.test(value?.toString())
}

/**
 * @description 密码强度校验，最少6位，大写字母，小写字母，数字，特殊符号中任意3项
 * @param value
 * @returns {boolean}
 */
export function isPasswordMedium(value: string) {
    return /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{6,}/.test(value)
}

/**
 * @description 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 * @param value
 * @returns {boolean}
 */
export function isPasswordStrict(value: string) {
    return /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(value)
}

/**
 * @description 判断是否是数字且最多两位小数
 * @param value
 * @returns {boolean}
 */
export function isNum(value: string | number) {
    return /^\d+(\.\d{1,2})?$/.test(value?.toString())
}

/**
 * @description 判断是否是日期，支持闰年判断
 * @param value
 * @returns {boolean}
 * @example
 * 2000-02-29：true/2021-02-29：false
 */
export function isDate(value: string) {
    return /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/.test(value?.toString())
}

/**
 * @description 判断字符串是否是base64
 * @param value
 * @returns {boolean}
 */
export function isBase64(value: string) {
    if (value === '' || value.trim() === '') {
        return false;
    }
    try {
        return btoa(atob(value)) == value;
    } catch (err) {
        return false;
    }
};

/**
 * 验证密码强度值
 * @param password - 需要验证的密码字符串
 * @returns 密码强度的分数（0-5）
 * @example
   const pwd1 = '12345';
   const pwd1Strength = checkPasswordStrength(pwd1);// 0
   const pwd2 = '123456';
   const pwd2Strength = checkPasswordStrength(pwd2);// 2
   const pwd3 = '123456qwe';
   const pwd3Strength = checkPasswordStrength(pwd3);// 3
   const pwd4 = '123456qweABC';
   const pwd4Strength = checkPasswordStrength(pwd4);// 4
   const pwd5 = '123@456qwe=ABC';
   const pwd5Strength = checkPasswordStrength(pwd5);// 5
 */
export function checkPasswordStrength(password: string | number): number {
    let score = 0;
    password = password.toString();

    // 定义密码强度评分规则
    const lengthCriteria = password.length >= 6; // 密码长度至少为6个字符
    const upperCaseCriteria = /[A-Z]/.test(password); // 至少包含一个大写字母
    const lowerCaseCriteria = /[a-z]/.test(password); // 至少包含一个小写字母
    const numberCriteria = /[0-9]/.test(password); // 至少包含一个数字
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 至少包含一个特殊字符

    // 根据规则逐项检查并评分
    if (lengthCriteria) {
        score++;
    } else {
        return 0
    }

    if (upperCaseCriteria) {
        score++;
    }

    if (lowerCaseCriteria) {
        score++;
    }

    if (numberCriteria) {
        score++;
    }

    if (specialCharCriteria) {
        score++;
    }

    return score;
}