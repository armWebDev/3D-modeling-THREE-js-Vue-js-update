// import { scene, selectedObj } from './sharedVariables';
// import * as THREE from 'three'

// const makePerpendicul = () => {

//     if (selectedObj.size > 0) {
//         const selectedArr = Array.from(selectedObj)
//         const lineA = selectedArr[0];
//         const lineB = selectedArr[1];


//         const p1 = lineA.userData.startPoint
//         const p2 = lineA.userData.endPoint
//         const p3 = lineB.userData.startPoint
//         const p4 = lineB.userData.endPoint


//         const k = (p2.y - p1.y) / (p2.x - p1.x);
//         const b = p1.y - (k * p1.x);


//         const k1 = (p4.y - p3.y) / (p4.x - p3.x);
//         const b1 = p3.y - (k1 * p3.x);
//         console.log(`Line A: y = ${k}x + ${b}`);
//         console.log(`Line B: y = ${k1}x + ${b1}`);

//         if (k === k1 || lineB.userData.pararelled == true && lineA.userData.pararelled == true) {
//             console.log("Lines are parallel; no intersection.");
//             return null;
//         }

//         const x = (b1 - b) / (k - k1);
//         const y = (k * x) + b;


//         const intersection = new THREE.Vector3(x, y, 0);

//         const newSql = new THREE.Vector3().subVectors(p2, intersection);
//         console.log(newSql);

//         const dirA = new THREE.Vector3().subVectors(p2, p1).normalize();

//         console.log("Intersection point:", intersection);

//         let intersectionToStart = intersection.distanceTo(p3)
//         let intersectionToEnd = intersection.distanceTo(p4)

//         let finalStart = new THREE.Vector3(-dirA.y, dirA.x, 0).multiplyScalar(intersectionToStart).add(intersection);
//         let finalEnd = null;
        
        
//         if ( p3.distanceTo(intersection) + p4.distanceTo(intersection) - p3.distanceTo(p4) <  1e-4) {
            
//             finalEnd = new THREE.Vector3(-dirA.y, dirA.x, 0).multiplyScalar(-intersectionToEnd).add(intersection)
//         } else {
//             finalEnd = new THREE.Vector3(-dirA.y, dirA.x, 0).multiplyScalar(intersectionToEnd).add(intersection)
//         }


//         lineB.geometry.setFromPoints([finalStart,finalEnd])

//         lineB.children[0].geometry.setFromPoints([finalStart])
//         lineB.children[1].geometry.setFromPoints([finalEnd])

        

//         lineB.geometry.attributes.position.needsUpdate = true
//         lineB.geometry.computeBoundingSphere()
//         selectedObj.clear()
        
        
//     }
//     else {
//         console.log("Select lines");
//     }
// }


// export default makePerpendicul



import { scene, selectedObj } from './sharedVariables';
import * as THREE from 'three'

const makePerpendicul = () => {

    if (selectedObj.size > 0) {
        const selectedArr = Array.from(selectedObj)
        const lineA = selectedArr[0];
        const lineB = selectedArr[1];


        const p1 = lineA.userData.startPoint
        const p2 = lineA.userData.endPoint
        const p3 = lineB.userData.startPoint
        const p4 = lineB.userData.endPoint


        const k = (p2.y - p1.y) / (p2.x - p1.x);
        const b = p1.y - (k * p1.x);


        const k1 = (p4.y - p3.y) / (p4.x - p3.x);
        const b1 = p3.y - (k1 * p3.x);
        console.log(`Line A: y = ${k}x + ${b}`);
        console.log(`Line B: y = ${k1}x + ${b1}`);

        if (k === k1 || lineB.userData.pararelled == true && lineA.userData.pararelled == true) {
            console.log("Lines are parallel; no intersection.");
            return null;
        }

        const x = (b1 - b) / (k - k1);
        const y = (k * x) + b;


        const intersection = new THREE.Vector3(x, y, 0);


        const dirA = new THREE.Vector3().subVectors(p2, p1).normalize();
        const dirB = new THREE.Vector3().subVectors(p4, p3).normalize();

        console.log("Intersection point:", intersection);

        let intersectionToStart = intersection.distanceTo(p3)
        let intersectionToEnd = intersection.distanceTo(p4)


        let angleInRadians = dirA.angleTo(dirB);
        let angleInDegrees = angleInRadians * (180 / Math.PI);
        
        console.log("Angle in radians:", angleInRadians);
        console.log("Angle in degrees:", angleInDegrees);
        console.log("Angle:", angleInDegrees-90);
        
        let axix = new THREE.Vector3(0,0,1)
        let perpDir = dirA.clone().applyAxisAngle(axix, Math.PI / 2) 
        console.log(perpDir);
        
      
        

        let finalStart = null
        let finalEnd = null;
        
        
        if (p3.distanceTo(intersection) + p4.distanceTo(intersection) - p3.distanceTo(p4) < 1e-4) {
            if ( p4.x > p3.x && p4.y > p3.y && p1.y > p2.y) {
                finalStart = perpDir.clone().multiplyScalar(-intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
            } 
            
            else if ( p4.x < p3.x && p4.y < p3.y && p1.y > p2.y) {
                finalStart = perpDir.clone().multiplyScalar(intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(-intersectionToEnd).add(intersection);
            } 
         
            else if ( p4.x > p3.x && p4.y < p3.y && p1.y < p2.y && p1.x > p2.x) {
                finalStart = perpDir.clone().multiplyScalar(intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(-intersectionToEnd).add(intersection);
            }
            else if ( p4.x < p3.x && p4.y > p3.y && p1.y < p2.y && p1.x > p2.x) {
                finalStart = perpDir.clone().multiplyScalar(-intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
            }
            else if ( p4.x > p3.x && p4.y > p3.y && p1.y < p2.y && p1.x > p2.x) {
                finalStart = perpDir.clone().multiplyScalar(intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(-intersectionToEnd).add(intersection);
            }
            else if ( p4.x < p3.x && p4.y > p3.y && p1.y > p2.y && p1.x < p2.x) {
                finalStart = perpDir.clone().multiplyScalar(-intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
            }
        
            else {                              
             

                    finalStart = perpDir.clone().multiplyScalar(-intersectionToStart).add(intersection);
                    finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
                
            }

        } else {
            // finalStart = perpDir.clone().multiplyScalar(-intersectionToStart).add(intersection);
            // finalEnd = perpDir.clone().multiplyScalar(-intersectionToEnd).add(intersection);
            if ( p4.x > p3.x && p4.y > p3.y && p1.y > p2.y) {
                finalStart = perpDir.clone().multiplyScalar(intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
            } 
            
            else if ( p4.x < p3.x && p4.y < p3.y && p1.y > p2.y) {
                finalStart = perpDir.clone().multiplyScalar(intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
            } 
            else if ( p4.x > p3.x && p4.y < p3.y && p1.y > p2.y) {
                finalStart = perpDir.clone().multiplyScalar(intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
            } 
         
            else if ( p4.x > p3.x && p4.y < p3.y && p1.y < p2.y && p1.x > p2.x) {
                finalStart = perpDir.clone().multiplyScalar(-intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(-intersectionToEnd).add(intersection);
            }
            else if ( p4.x < p3.x && p4.y > p3.y && p1.y < p2.y && p1.x > p2.x) {
                finalStart = perpDir.clone().multiplyScalar(intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
            }
            else if ( p4.x < p3.x && p4.y > p3.y && p1.y > p2.y && p1.x < p2.x) {
                finalStart = perpDir.clone().multiplyScalar(intersectionToStart).add(intersection);
                finalEnd = perpDir.clone().multiplyScalar(intersectionToEnd).add(intersection);
            }
         
            else {
                console.log(p4.y);
                                
             

                    finalStart = perpDir.clone().multiplyScalar(-intersectionToStart).add(intersection);
                    finalEnd = perpDir.clone().multiplyScalar(-intersectionToEnd).add(intersection);
                
            }

        }
        

        // lineB.geometry.setFromPoints([finalStart,finalEnd])
        lineB.geometry.setFromPoints([finalStart,finalEnd])

        lineB.children[0].geometry.setFromPoints([finalStart])
        lineB.children[0].geometry.computeBoundingSphere()

        lineB.children[1].geometry.setFromPoints([finalEnd])
        lineB.children[1].geometry.computeBoundingSphere()

        

        lineB.geometry.attributes.position.needsUpdate = true
        lineB.geometry.computeBoundingSphere()
        selectedObj.clear()
        
        
    }
    else {
        console.log("Select lines");
    }
}


export default makePerpendicul