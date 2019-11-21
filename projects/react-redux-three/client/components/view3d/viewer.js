import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)

export default class Viewer extends React.Component {
    constructor(props) {
        super(props);
    }

    camerea = null;
    renderer = null;
    scene = null;
    controls = null;

    componentDidMount() {
        this.init();
        window.addEventListener('resize', this.applyResize.bind(this), false);
    }

    componentWillReceiveProps = (nextProps) => {
       if (nextProps.shape !== this.props.shape) {
           this.clearScene();
           if (nextProps.shape === 'cube') {
               this.createCube();
           } else if (nextProps.shape === 'sphere') {
               this.createSphere();
           }
           this.renderer.render(this.scene, this.camera);
       }
   }

    applyResize() {
        if (!this.camera) {
            return;
        }
        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
        this.renderer.render(this.scene, this.camera);
    }

    init = () => {
        let component = this;
        let width = ReactDOM.findDOMNode(component).clientWidth;
        let height = ReactDOM.findDOMNode(component).clientHeight;
        let backgroundColor = '#C6D7E1';

        this.scene = new THREE.Scene();

        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.65);
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        directionalLight.position.z = 1;
        directionalLight.position.normalize();
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
        this.scene.add(light);

        light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(backgroundColor, 0);

        //////////
        //////////

        this.camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
        this.camera.position.set(0, 500, 400);
        this.scene.add(this.camera);
        directionalLight.position.copy(this.camera.position);


        this.controls = new OrbitControls(this.camera, ReactDOM.findDOMNode(component), this.renderer);
        this.controls.addEventListener('change', () => {
            directionalLight.position.copy(this.camera.position);
            this.renderer.render(this.scene, this.camera);
        });
        this.controls.maxPolarAngle =  Math.PI/2; // prevent the camera from going under the ground
        this.controls.minDistance = 0.1;
        this.controls.maxDistance = 1000;

        ReactDOM.findDOMNode(component).replaceChild(this.renderer.domElement, ReactDOM.findDOMNode(component).firstChild);

        this.renderer.render(this.scene, this.camera);

        this.createCube();
    }

    clearScene = () => {
         for( let i = this.scene.children.length - 1; i >= 0; i--) {
             if (this.scene.children[i] instanceof THREE.Mesh) {
                 this.scene.remove(this.scene.children[i]);
             }
         }
    }

    createCube = () => {
        let mesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), new THREE.MeshPhongMaterial({ color: '#007fff'}));
        mesh.position.set(0, 0, 0);
        this.scene.add(mesh);

        this.renderer.render(this.scene, this.camera);
    }

    createSphere = () => {
        let geometry = new THREE.SphereGeometry(50, 20, 20, 0, Math.PI * 2, 0, Math.PI * 2);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: '#007fff'}));

        mesh.position.set(0, 0, 0);
        this.scene.add(mesh);

        this.renderer.render(this.scene, this.camera);
    }

    render = () =>  {
        return (
           <div id="Graph3D" style={{width: '100%', height:'100%'}}>
                 <div style={{
                         textAlign: 'center',
                         marginTop: 0
                     }}>
                 </div>
           </div>
       );
    }
}
