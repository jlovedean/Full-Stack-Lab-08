//input boxes
var rectangleInput = document.getElementById('rectangle-input');
var rectangleInput2 = document.getElementById('rectangle-input-2');
var squareInput = document.getElementById('square-input');
var circleInput = document.getElementById('circle-input');
var triangleInput = document.getElementById('triangle-input');

var shapeNameLabel = document.getElementById('shape-name');
var shapeWidthLabel = document.getElementById('width-return');
var shapeHeightLabel = document.getElementById('height-return');
var shapeRadiusLabel = document.getElementById('radius-return');
var shapeAreaLabel = document.getElementById('area-return');
var shapePerimeterLabel = document.getElementById('perimeter-return');

var canvas = document.getElementById('canvas');

document.getElementById('circle-btn').addEventListener('click', createCircle);
document.getElementById('rectangle-btn').addEventListener('click', createRectangle);
document.getElementById('triangle-btn').addEventListener('click', createTriangle);
document.getElementById('square-btn').addEventListener('click', createSquare);
 
//Creating my Shapes
function createCircle() {
    var inputRadius = circleInput.value
    new Circle(inputRadius);
}

function createTriangle() {
    new Triangle( triangleInput.value);
}

function createRectangle() {
    new Rectangle(rectangleInput.value, rectangleInput2.value);
}

function createSquare() {
    new Square(squareInput.value);
}

//Creating the Shape class
function Shape(width, height) {
    this.width = width;
    this.height = height;
}

//Drawing the shapes
Shape.prototype.draw = function() {
    this.div = document.createElement('div');
    this.div.className = 'shape ' + this.cssClass; //TODO place css class

//Need to be able to place the shapes within the canvas
var x = Math.floor(Math.random() * (600 - this.width));
var y = Math.floor(Math.random() * (600 - this.height));
// Now need to add px to it so that it registers on the screen
this.div.style.top = y + 'px';
this.div.style.left = x +'px';
this.div.style.width = this.width + 'px';
this.div.style.height = this.height + 'px';

//need to add event listeners to the shapes

this.div.addEventListener('click', this.describe.bind(this));
this.div.addEventListener('dblclick', function() {
    this.div.remove();
}.bind(this));

//add drawn shapes to the designated area
canvas.appendChild(this.div);
}
//Need to put the shapes descriptions next to the canvas
Shape.prototype.describe = function() {
    shapeNameLabel.innerText = this.constructor.name; //ask David about the constructor, had to copy to get to work
    shapeWidthLabel.innerText = this.width;
    shapeHeightLabel.innerText = this.height;
    shapeRadiusLabel.innerText = this.radius;
    shapeAreaLabel.innerText = this.area();//will write a function for each shape
    shapePerimeterLabel.innerText = this.perimeter();
}
//starting with the circle

var Circle = function(radius) {
    Shape.call(this, 2 * radius, 2 * radius) // Putting (2 * radius) in as the height and width because that is how height and width are used to create circles, for a rectangle it would stay height and width,
    this.radius = radius;
    this.cssClass = 'circle';
    this.draw() //calling my draw function 
}
//Need to do the last two steps of inheritance
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function() {
    return Math.PI * Math.pow(this.radius, 2);
}

Circle.prototype.perimeter = function() {
    return 2 * Math.PI * this.radius;
}

//Circle.prototype.diameter = function() {
//    return 2 * this.radius;
//}
//var c1 = new Circle(700, 900, 50);

//Need to create the triangle class next
function Triangle(height) {
    Shape.call(this, height, height);
    this.cssClass = 'triangle';
    this.draw();
    //Need to look up how to make a triangle
    this.div.style.width = '0';
    this.div.style.height = '0';
    this.div.style.borderRightWidth = height + 'px'; //have to find out why its not regiterring
    this.div.style.borderBottomWidth = height + 'px';
}
//fix the inheritance name change
Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

//Need to make methods for triangle area & perimeter
Triangle.prototype.area = function() {
    return 0.5 * this.height * this.height;
}
//Need to look up how to get a triangles perimeter
Triangle.prototype.perimeter = function() {
    return 2 * this.height + Math.sqrt(2 * Math.pow(this.height, 2));
}

//Time to make the rectangle shape which will be the squares parent
function Rectangle(width, height) {
    Shape.call(this, width, height);
    this.cssClass = 'rectangle';
    this.draw();
}
//Need to fix the Rectangle constructor from inheritance
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

//start the functions to find the area and perimeter. Shape constructor takes care of the rest
Rectangle.prototype.area = function() {
    return this.width * this.height;
}

Rectangle.prototype.perimeter = function() {
    return 2 * this.width + 2 * this.height;
}

//Time to make the square constructor, remember to inherit from rectangle not shape
function Square(side) {
    Rectangle.call(this, side, side);
    this.cssClass = 'square';//need to fix the shape drawing with both colors
    this.div.classList.remove('rectangle');
    this.div.classList.add(this.cssClass);
}
//Need to fix the square constructor after inheritance
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;