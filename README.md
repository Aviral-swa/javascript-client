## HTML
**Description:**
* Hypertext Markup Language is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.
**HTML Tags**
* html
* head
* body
* header
* section
* div 
* footer
* a
* p
* i
* h1...h6

**HTML Blocks**
* Block
    * A block-level element always starts on a new line and takes up the full width available. exp: tags
    p, h1...h6, ul, ol, 
* Inline
    *  An inline element does not start on a new line and it only takes up as much width as necessary. exp: tags
    b, i, u, a, del, ins, li

**HTML Attributes**
* Attributes are used to define the characteristics of an HTML element. Types of Attributes:
* id
* class
* title
* style

## CSS
**Description**
* Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript. There are 3 ways to implement CSS in a HTML code:
* Inline
    * Inline CSS allows you to apply a unique style to one HTML element at a time. You assign CSS to a specific HTML element by using the style attribute with any CSS properties defined within it.
* Internal
    * An internal CSS is used to define a style for a single HTML page. An internal CSS is defined in the _head_ section of an HTML page, within a _style_ element.
* External
    * An external stylesheet is a standalone . css file that is linked from a web page. The advantage of external stylesheets is that it can be created once and the rules applied to multiple web pages.

## Flex
CSS Flexible Box Layout, commonly known as Flexbox, is a CSS 3 web layout model. The flex layout allows responsive elements within a container to be automatically arranged depending upon screen size.

The flex property in CSS is the combination of flex-grow, flex-shrink, and flex-basis property. It is used to set the length of flexible items. The flex property is much responsive and mobile friendly. It is easy to positioning child elements and the main container. The margin doesn’t collapse with the content margins. Order of any element can be easily changed without editing the HTML section. Some of the flex properties are:
* flex-grow: 
    * A number that specify, how much items will grow relative to the rest of the flexible items.
* flex-shrink:
    * A number that specify, how much items will shrink relative to the rest of the flexible items.
* flex-basis:
    * It sets the length of items. Legal values of flex basis are: auto, inherit, or a number followed by %, em, px or any other length unit.
## BEM MODEL
Block Element Modifier is a methodology, that helps you to achieve reusable components and code sharing in the front-end. The main idea behind it is to speed up the development process, and ease the teamwork of developers by arranging CSS classes into independent modules.
* **BLOCK**

    A block represents an object in your website. Think of it as bigger structural chunks of your code. Most common blocks on every website today are header, content, sidebar, footer, and search. Blocks in BEM are always a starting point of chaining your CSS classes on to. Take a look at a few block examples:
    * A content
    * A menu
    * A search from

* **ELEMENT**

    An element is a component within the block that performs a particular function. It should only make sense in the context of its block

* **MODIFIER**

    A modifier is how we represent the variations of a block. If you’ve ever used Bootstrap, then the best example would be the button sizes.
## CSS RESET
A CSS Reset (or “Reset CSS”) is a short, often compressed (minified) set of CSS rules that resets the styling of all HTML elements to a consistent baseline.

Every browser has its own default ‘user agent’ stylesheet, that it uses to make unstyled websites appear more legible. For example, most browsers by default make links blue and visited links purple, give tables a certain amount of border and padding, apply variable font-sizes to H1, H2, H3 etc. and a certain amount of padding to almost everything.

From the consistent base that you’ve set up via your reset, you can then go on to re-style your document, safe in the knowledge that the browsers’ differences will not be affecting your code.

