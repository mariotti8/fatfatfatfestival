// Matter.js - http://brm.io/matter-js/
var Example = Example || {};

Example.sprites = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            background: '#0f0f13',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var offset = 10,
        options = { 
            isStatic: true,
            render: {
              fillStyle: 'transparent'
            }
        };

    world.bodies = [];

    // these static walls will not be rendered in this sprites example, see options
    World.add(world, [
        Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
        Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
    ]);

    var stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x, y) {
        if (Common.random() > 0.35) {
            return Bodies.rectangle(x, y, 496, 107, {
                render: {
                    strokeStyle: '#ffffff',
                    sprite: {
                        texture: 'https://uploads-ssl.webflow.com/5c2492714fdbba6d4fbe0587/5caeec0d71210e4b0c2f08e5_Untitled-1.png'
                    }
                }
            });
        } else {
            return Bodies.circle(x, y, 46, {
                density: 0.0005,
                frictionAir: 0.06,
                restitution: 0.3,
                friction: 0.01,
                render: {
                    sprite: {
                        texture: '//cdn.rawgit.com/liabru/matter-js/2560a681/demo/img/ball.png'
                    }
                }
            });
        }
    });

    World.add(world, stack);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

// create demo interface
// not required to use Matter.js

MatterTools.Demo.create({
  toolbar: {
    title: 'matter-js',
    url: 'https://github.com/liabru/matter-js',
    reset: true,
    source: true,
    fullscreen: true,
    exampleSelect: true
  },
  preventZoom: true,
  resetOnOrientation: true,
  examples: [
    {
      name: 'Sprites',
      id: 'sprites',
      init: Example.sprites,
      sourceLink: 'https://github.com/liabru/matter-js/blob/master/examples/sprites.js'
    }
  ]
});