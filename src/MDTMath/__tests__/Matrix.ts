import { Matrix4} from '../Matrix'; 

test('Matrix transpose non-square matrix',()=>{
  let m2 = new Matrix4([
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16],
    [17,18,19,20]
  ]);
  let exspect = new Matrix4([[1, 5, 9, 13, 17], [2, 6, 10, 14, 18], [3, 7, 11, 15, 19], [4, 8, 12, 16, 20]]);
  let res =  m2.transpose(); 
  expect(res ).toEqual(exspect);
});