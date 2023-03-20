import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";

const BabylonModel = ({ data }) => {
  let engine = null;
  let scene = null;
  let sceneToRender = null;
  const canvas = useRef(null);

  const startRenderLoop = (engine) => {
    engine.runRenderLoop(() => {
      if (sceneToRender && sceneToRender.activeCamera) {
        sceneToRender.render();
      }
    });
  };

  const createDefaultEngine = () =>
    new BABYLON.Engine(canvas.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

  const createScene = () => {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      (13 * Math.PI) / 8,
      Math.PI / 4,
      2.4,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas.current, false);

    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 1.7;

    var pl = new BABYLON.PointLight("pl", BABYLON.Vector3.Zero(), scene);
    pl.diffuse = new BABYLON.Color3(1, 1, 1);
    pl.specular = new BABYLON.Color3(1, 1, 1);
    pl.intensity = 0.8;

    var mat = new BABYLON.StandardMaterial("dog", scene);
    mat.diffuseTexture = new BABYLON.Texture(
      `${data ? data : "https://i.ibb.co/ZWR4wTy/react.png"}`,
      scene
    );
    mat.diffuseTexture.hasAlpha = true;
    mat.backFaceCulling = true;

    var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    box.material = mat;

    return scene;
  };

  useEffect(() => {
    const initFunction = async () => {
      const asyncEngineCreation = async () => {
        try {
          return createDefaultEngine();
        } catch (e) {
          console.log(
            "the available createEngine function failed. Creating the default engine instead"
          );
          return createDefaultEngine();
        }
      };
      engine = await asyncEngineCreation();
      if (!engine) throw "engine should not be null.";
      startRenderLoop(engine);
      scene = createScene();
    };
    initFunction().then(() => {
      sceneToRender = scene;
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });

    return () =>
      window.removeEventListener("resize", function () {
        engine.resize();
      });
  }, [data]);

  return (
    <div className="babylon-container">
      <canvas ref={canvas} id="renderCanvas" />
    </div>
  );
};

export default BabylonModel;
