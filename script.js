//Creating the Shape class
var Shape = function(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    //May need to add x and y once I figure out how I am going to place 
    //the shapes randomly on the screen
}

//Drawing the Circle class to get started
var Circle = function(radius) {
    Shape.call(this, x, y, (2 * radius), (2 * radius)) // Putting (2 * radius) in as the height and width because that is how height and width are used to create circles, for a rectangle it would stay height and width,
    this.radius = radius;
    this.div = document.createElement('div');
    this.div.className = 'circle';
    this.div.style.width = this.diameter() + ' px'; //calling the diameter method
    this.div.style.height = this.diameter() + 'px';
    document.body.appendChild(this.div);
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function() {
    return Math.PI * Math.pow(this.radius, 2);
}

Circle.prototype.perimeter = function() {
    return 2 * Math.PI * this.radius;
}

Circle.prototype.diameter = function() {
    return 2 * this.radius;
}
var c1 = new Circle(700, 900, 50);