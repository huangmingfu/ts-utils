//  npx jest test/validate.test.ts
import { checkPasswordStrength } from '../utils/validate';

describe('checkPasswordStrength', () => {
    it('应返回0，当密码少于6个字符时', () => {
        expect(checkPasswordStrength('12abc')).toBe(0);
    });

    it('应返回2，当密码仅包含小写字母且至少6个字符时', () => {
        expect(checkPasswordStrength('abcdef')).toBe(2);
    });

    it('应返回3，当密码包含小写和大写字母且至少6个字符时', () => {
        expect(checkPasswordStrength('Abcdef')).toBe(3);
    });

    it('应返回4，当密码包含小写、大写字母和数字且至少6个字符时', () => {
        expect(checkPasswordStrength('Abcde1')).toBe(4);
    });

    it('应返回5，当密码包含小写、大写字母、数字和特殊字符且至少6个字符时', () => {
        expect(checkPasswordStrength('Abcde1!')).toBe(5);
    });

    it('应返回0，当密码不符合任何标准时', () => {
        expect(checkPasswordStrength('')).toBe(0);
    });

    it('应返回5，当密码非常强时', () => {
        expect(checkPasswordStrength('Strong1!')).toBe(5);
    });
});