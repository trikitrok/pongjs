'use strict';

describe('Player', function () {
  var player;

  beforeEach(function () {
    player = new Player($V([0, 0]));
  });

  it('should have a zero score when first created', function () {
    expect(player.score).toBe(0);
  });

  it('should render itself as a rectangle when render gets called relative to the player position', function () {
    var context = RenderingTestsHelper.create2dRenderContext(),
      rctxt = context.context;
    spyOn(rctxt, 'beginPath');
    spyOn(rctxt, 'rect');
    spyOn(rctxt, 'fill');
    spyOn(rctxt, 'closePath');

    player.render(context);

    expect(rctxt.beginPath.calls.any()).toBeTruthy();
    expect(rctxt.rect.calls.argsFor(0)).toEqual(
      [player.position.e(1) - player.width / 2, player.position.e(2) - player.height / 2, player.width, player.height]
    );
    expect(rctxt.fill.calls.any()).toBeTruthy();
    expect(rctxt.closePath.calls.any()).toBeTruthy();
  });

  it('should be initialized with a starting position', function () {
    expect(player.position).toEqual($V([0, 0]))
  });

  it('should start without the ball', function () {
    expect(player.hasTheBall()).toBeFalsy();
  });

  it('should know if it has the ball', function () {
    expect(player.hasTheBall()).toBeFalsy();

    player.receiveTheBall();

    expect(player.hasTheBall()).toBeTruthy();
  });

  it('should be able to receive the ball', function () {
    player.receiveTheBall();

    expect(player.hasTheBall()).toBeTruthy();
  });

  it('should call all his components update on his own update', function () {
    var behavior = jasmine.createSpyObj('KeyboardControlledBehavior', ['update']);
    player = new Player($V([0, 0]), [behavior, behavior]);

    player.update(0);

    expect(behavior.update.calls.count()).toBe(2);
  });

  it('should add <0, -0.001> to acceleration when move left gets called', function () {
    expect(player.acceleration).toEqual($V([0, 0]));

    player.moveLeft();

    expect(player.acceleration).toEqual($V([0, -0.001]));

  });

  it('should add <0, 0.001> to acceleration when move right gets called', function () {
    expect(player.acceleration).toEqual($V([0, 0]));

    player.moveRight();

    expect(player.acceleration).toEqual($V([0, 0.001]));
  });
});