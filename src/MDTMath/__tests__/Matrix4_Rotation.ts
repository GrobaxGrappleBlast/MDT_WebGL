import { Matrix4} from '../Matrix'; 
import { Vector, Vector4 } from '../Vector'; 

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- ---  Rotation Z --- ---  Rotation Z --- ---  Rotation Z --- ---  Rotation Z 
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

test('Matrix4 rotation in Z, pi/2',()=>{

    let angle = Math.PI/2;
    let m = Matrix4.RotationMatrixZ(angle);
    let v = new Vector4( [    1, 1,  1 ,0   ] );
    let exspected =     [   -1, 1,  1 ,0   ];
    let real = (m.multiply(v) as Vector)._data ;

    // --- Test Execution --- --- --- --- --- --- --- ---
    let [ ex , ey ,ez ,ec ] = exspected;
    let [ rx , ry ,rz ,rc ] = real;
    expect( rx ).toBeCloseTo( ex );
    expect( ry ).toBeCloseTo( ey );
    expect( rz ).toBeCloseTo( ez );
    expect( rc ).toBeCloseTo( ec );
  })
  
  test('Matrix4 rotation in Z,  pi',()=>{
  
    let angle = Math.PI;
    let m = Matrix4.RotationMatrixZ(angle);
    let v = new Vector4( [    1, 1,1,0   ] );
    let exspected =     [   -1,-1,1,0   ];
    let real = (m.multiply(v) as Vector)._data ;
    // --- Test Execution ---
    let [ ex , ey ,ez ,ec ] = exspected;
    let [ rx , ry ,rz ,rc ] = real;
    expect( rx ).toBeCloseTo( ex );
    expect( ry ).toBeCloseTo( ey );
    expect( rz ).toBeCloseTo( ez );
    expect( rc ).toBeCloseTo( ec );
  })
  test('Matrix4 rotation in Z, 3 * pi/4',()=>{
    let angle = (Math.PI/2)*3;
    let m = Matrix4.RotationMatrixZ(angle);
    let v = new Vector4( [    1, 1, 1, 0   ] );
    let exspected =     [    1,-1, 1, 0   ];
    let real = (m.multiply(v) as Vector)._data ;
    // -- Test Execution ---
    let [ ex , ey ,ez ,ec ] = exspected;
    let [ rx , ry ,rz ,rc ] = real;
    expect( rx ).toBeCloseTo( ex );
    expect( ry ).toBeCloseTo( ey );
    expect( rz ).toBeCloseTo( ez );
    expect( rc ).toBeCloseTo( ec );
})

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- --- Rotation Y --- --- Rotation Y --- --- Rotation Y --- --- Rotation Y 
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

test('Matrix4 rotation in Y, pi/2',()=>{

  let angle = Math.PI/2;
  let m = Matrix4.RotationMatrixY(angle);
  let v = new Vector4( [    1, 1,  1 ,0   ] );
  let exspected =     [    1, 1, -1 ,0   ];
  let real = (m.multiply(v) as Vector)._data ;

  // --- Test Execution --- --- --- --- --- --- --- ---
  
  let [ ex , ey ,ez ,ec ] = exspected;
  let [ rx , ry ,rz ,rc ] = real;
  expect( rx ).toBeCloseTo( ex );
  expect( ry ).toBeCloseTo( ey );
  expect( rz ).toBeCloseTo( ez );
  expect( rc ).toBeCloseTo( ec );
})
test('Matrix4 rotation in Y,  pi',()=>{

  let angle = Math.PI;
  let m = Matrix4.RotationMatrixY(angle);
  let v = new Vector4( [    1, 1, 1,0   ] );
  let exspected =     [   -1, 1,-1,0   ];
  let real = (m.multiply(v) as Vector)._data ;
  // --- Test Execution ---
  let [ ex , ey ,ez ,ec ] = exspected;
  let [ rx , ry ,rz ,rc ] = real;
  expect( rx ).toBeCloseTo( ex );
  expect( ry ).toBeCloseTo( ey );
  expect( rz ).toBeCloseTo( ez );
  expect( rc ).toBeCloseTo( ec );
})
test('Matrix4 rotation in Y, 3 * pi/2',()=>{
  let angle = (Math.PI/2)*3;
  let m = Matrix4.RotationMatrixY(angle);
  let v = new Vector4( [    1, 1, 1, 0   ] );
  let exspected =     [   -1, 1, 1, 0   ];
  let real = (m.multiply(v) as Vector)._data ;
  // -- Test Execution ---
  let [ ex , ey ,ez ,ec ] = exspected;
  let [ rx , ry ,rz ,rc ] = real;
  expect( rx ).toBeCloseTo( ex );
  expect( ry ).toBeCloseTo( ey );
  expect( rz ).toBeCloseTo( ez );
  expect( rc ).toBeCloseTo( ec );
})
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- --- Rotation X --- --- Rotation X --- --- Rotation X --- --- Rotation X
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
test('Matrix4 rotation in X, pi/2',()=>{

  let angle = Math.PI/2;
  let m = Matrix4.RotationMatrixX(angle);
  let v = new Vector4( [    1, 1,  1 ,0   ] );
  let exspected =     [    1,-1,  1 ,0   ];
  let real = (m.multiply(v) as Vector)._data ;

  // --- Test Execution --- --- --- --- --- --- --- ---
  
  let [ ex , ey ,ez ,ec ] = exspected;
  let [ rx , ry ,rz ,rc ] = real;
  expect( rx ).toBeCloseTo( ex );
  expect( ry ).toBeCloseTo( ey );
  expect( rz ).toBeCloseTo( ez );
  expect( rc ).toBeCloseTo( ec );
})

test('Matrix4 rotation in X,  pi',()=>{

  let angle = Math.PI;
  let m = Matrix4.RotationMatrixX(angle);
  let v = new Vector4( [    1, 1, 1,0   ] );
  let exspected =     [    1,-1,-1,0   ];
  let real = (m.multiply(v) as Vector)._data ;
  // --- Test Execution ---
  let [ ex , ey ,ez ,ec ] = exspected;
  let [ rx , ry ,rz ,rc ] = real;
  expect( rx ).toBeCloseTo( ex );
  expect( ry ).toBeCloseTo( ey );
  expect( rz ).toBeCloseTo( ez );
  expect( rc ).toBeCloseTo( ec );
})

test('Matrix4 rotation in X, 3 * pi/2',()=>{
  let angle = (Math.PI/2)*3;
  let m = Matrix4.RotationMatrixX(angle);
  let v = new Vector4( [    1, 1, 1, 0   ] );
  let exspected =     [    1, 1,-1, 0   ];
  let real = (m.multiply(v) as Vector)._data ;
  // -- Test Execution ---
  let [ ex , ey ,ez ,ec ] = exspected;
  let [ rx , ry ,rz ,rc ] = real;
  expect( rx ).toBeCloseTo( ex );
  expect( ry ).toBeCloseTo( ey );
  expect( rz ).toBeCloseTo( ez );
  expect( rc ).toBeCloseTo( ec );
})
