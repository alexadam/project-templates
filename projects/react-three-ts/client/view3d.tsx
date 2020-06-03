import React, {useRef, useEffect} from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const View3d: React.FC<{}> = ({}) => {
 
    let refContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {

        if (!refContainer) return
        if (!refContainer.current) return

        let width = refContainer.current.clientWidth
        let height = refContainer.current.clientHeight
        let backgroundColor = '#C6D7E1'

        let renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        renderer.setSize(width, height)
        renderer.setClearColor(backgroundColor, 0)

        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000)
        camera.position.set(0, 500, 400)
        scene.add(camera)

        let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.y = 0;
        directionalLight.position.z = 1;
        directionalLight.position.normalize();
        directionalLight.castShadow = true;
        // directionalLight.position.copy(camera.position)
        scene.add(camera)

        let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        scene.add(light);

        light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
        scene.add(light);


        let controls = new OrbitControls(camera, renderer.domElement)
        controls.addEventListener('change', () => {
            directionalLight.position.copy(camera.position);
            renderer.render(scene, camera);
        });
        controls.maxPolarAngle =  Math.PI/2 // prevent the camera from going under the ground
        controls.minDistance = 0.1
        controls.maxDistance = 1000
    
        
        refContainer.current.appendChild(renderer.domElement)

        // create cube
        let mesh = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshPhongMaterial({ color: '#007fff'}));
        mesh.position.set(0, 0, 0);
        scene.add(mesh);

        renderer.render(scene, camera)
        
    }, [])

    return (
        <div style={{width: '500px', height: '500px'}}>
            <div style={{width: '100%', height: '100%'}} ref={refContainer}>
            
            </div>
        </div>
    )
}
export default View3d