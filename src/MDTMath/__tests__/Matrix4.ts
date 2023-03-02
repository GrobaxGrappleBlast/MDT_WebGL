import {Matrix, Matrix4} from '../Matrix';
import { Vector } from '../Vector';

test('Matrix4 times Matrix4',()=>{

    let m1 = new Matrix4([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]);
    let m2 = new Matrix4([[17, 18, 19, 20], [21, 22, 23, 24], [25, 26, 27, 28], [29, 30, 31, 32]]);
    let expected = new Matrix4([
            [250, 260, 270, 280],
            [618, 644, 670, 696],
            [986, 1028, 1070, 1112],
            [1354, 1412, 1470, 1528]
        ]
      );   
    let res = m1.multiply(m2); 
    expect( res ).toEqual(expected); 
    let exspectedReversed = new Matrix4([[538, 612, 686, 760], [650, 740, 830, 920], [762, 868, 974, 1080], [874, 996, 1118, 1240]]);
    res = m2.multiply(m1);
    expect( res ).toEqual(exspectedReversed);
  }
)

test('Matrix4 times Matrix3x4',()=>{

  let m1 = new Matrix4([[17, 18, 19, 20], [21, 22, 23, 24], [25, 26, 27, 28], [29, 30, 31, 32]]);
  let m2 = new Matrix([[1, 2, 3], [5, 6, 7], [9, 10, 11], [12, 13, 14]]);
  let expected = new Matrix([[518, 592, 666], [626, 716, 806], [734, 840, 946], [842, 964, 1086]]);

  let res = m1.multiply(m2); 
  expect( res ).toEqual(expected);

  }
)

test('Matrix4 times Matrix2x4',()=>{

  let m1 = new Matrix4([[17, 18, 19, 20], [21, 22, 23, 24], [25, 26, 27, 28], [29, 30, 31, 32]]);
  let m2 = new Matrix([[1, 2], [5, 6 ], [9, 10 ], [12, 13 ]]);
  let expected = new Matrix([[518, 592], [626, 716], [734, 840], [842, 964]]);

  let res = m1.multiply(m2); 
  expect( res ).toEqual(expected);

  }
)

test('Matrix4 times Matrix1x4',()=>{

  let m1 = new Matrix4([[17, 18, 19, 20], [21, 22, 23, 24], [25, 26, 27, 28], [29, 30, 31, 32]]);
  let m2 = new Matrix([[1], [5 ], [9 ], [12 ]]);
  let expected = new Matrix([[518], [626], [734], [842]]);
  
  let res = m1.multiply(m2); 
  expect( res ).toEqual(expected);

  let v2 = new Vector ([1,5,9,12]);
  let vexpected = new Vector([ 518 , 626 , 734 , 842 ]);
  let vres = m1.multiply(v2);
  expect( vres ).toEqual(vexpected);
  }
)