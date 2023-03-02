import {Matrix, Matrix2} from '../Matrix';
import { Vector } from '../Vector';

test('Matrix2 times Matrix2', () => {
    let m1 = new Matrix2([[1, 2], [3, 4]]);
    let m2 = new Matrix2([[5, 6], [7, 8]]);
    let expected = new Matrix2([[19, 22], [43, 50]]);
    let res = m1.multiply(m2);
    expect(res).toEqual(expected);
  });
  
  test('Matrix2 times Matrix2x1', () => {
    let m1 = new Matrix2([[1, 2], [3, 4]]);
    let m2 = new Matrix([[5], [6]]);
    let expected = new Matrix([[17], [39]]);
    let res = m1.multiply(m2);
    expect(res).toEqual(expected);
  
    let v2 = new Vector([5, 6]);
    let vexpected = new Vector([17, 39]);
    let vres = m1.multiply(v2);
    expect(vres).toEqual(vexpected);
  });