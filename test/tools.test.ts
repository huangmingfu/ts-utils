// npm test -- --verbose 显示测试结果
// npx jest test/tools.test.ts 指定测试某个文件

import { maskSensitiveInfo, toArray } from '../utils/tools';

describe('脱敏测试', () => {
  test('maskSensitiveInfo - default lengths for phone number', () => {
    const input = '13722164537';
    const output = maskSensitiveInfo(input);
    console.log(`Input: ${input}, Output: ${output}`); // This will be displayed in the console
    expect(output).toBe('137****4537');
  });

  test('maskSensitiveInfo - default lengths for ID card', () => {
    const input = '123456199001011234';
    const output = maskSensitiveInfo(input);
    console.log(`Input: ${input}, Output: ${output}`); // This will be displayed in the console
    expect(output).toBe('123***********1234');
  });

  test('maskSensitiveInfo - custom lengths', () => {
    const input = '123456199001011234';
    const output = maskSensitiveInfo(input, 4, 4);
    console.log(`Input: ${input}, Output: ${output}`); // This will be displayed in the console
    expect(output).toBe('1234**********1234');
  });

  test('maskSensitiveInfo - input too short', () => {
    const input = '12345';
    expect(() => maskSensitiveInfo(input, 3, 2)).toThrow('Input is too short to mask with the given lengths');
  });
});

/** describe.only这个测试文件目前执行的测试 */
describe.only('数组转换测试', () => {
  test('toArray - 将字符串转换为数组', () => {
    const input = 'hello,world';
    const output = toArray(input);
    console.log(`Input: ${input}, Output: ${output}`);
    expect(output).toEqual(['hello,world']);
  });

  test('toArray - 数组原封不动返回', () => {
    const input = [1,2];
    const output = toArray(input);
    console.log(`Input: ${input}, Output: ${output}`);
    expect(output).toEqual([1,2]);
  });
});