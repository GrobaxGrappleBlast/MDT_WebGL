import {Matrix, Matrix3} from  '../Matrix';
import { Vector, Vector3 } from '../Vector';


test('Matrix3 times Matrix3',()=>{
    let m1 = new Matrix3([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    let m2 = new Matrix3([[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
    let expected = new Matrix3([[30, 24, 18], [84, 69, 54], [138, 114, 90]]);
    
    let res = m1.multiply(m2); 
    expect( res ).toEqual(expected); 
    
    
    let exspectedReversed = new Matrix3([[90, 114, 138], [54, 69, 84], [18, 24, 30]]);
    res = m2.multiply(m1);
    expect( res ).toEqual(exspectedReversed);
  }
)


test('Matrix3 times Matrix3x2',()=>{

    let m1 = new Matrix3([[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
    let m2 = new Matrix([[1, 2], [3, 4], [5, 6]]);
    let expected = new Matrix([[68, 92], [41, 56], [14, 20]]);
    
    let res = m1.multiply(m2);
    expect( res ).toEqual(expected);
    
}
)

test('Matrix3 times Matrix3x1',()=>{

    let m1 = new Matrix3([[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
    let m2 = new Matrix([[1], [2], [3]]);
    let expected = new Matrix([[46], [28], [10]]);
    
    let res = m1.multiply(m2);
    expect( res ).toEqual(expected);
    
    let v2 = new Vector3([1,2,3]);
    let vexpected = new Vector3([46, 28, 10]);
    let vres = m1.multiply(v2);
    expect( vres ).toEqual(vexpected);
}
)