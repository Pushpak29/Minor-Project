var lastX;
var RlastX;
var lastY;
var RlastY;
var currX = "n/d";
var RcurrX;
var RcurrY;
var currY = "n/d";
var xlen;
var len;
var special = 0; // To deal with highlighting the circle while deleting

var Xcircle;
var doorName;
var testing;
var SectorStart;
var tempSecPosX;
var tempSecPosY;
var SectorPosX1;
var RsectorPosX1;
var SectorPosY1;
var RsectorPosY1;
var SectorPosX2;
var RsectorPosX2;
var SectorPosY2;
var RsectorPosY2;
var SectorPosX3;
var RsectorPosX3;
var SectorPosY3;
var RsectorPosY3;
var SectorPosX4;
var RsectorPosX4;
var SectorPosY4;
var RsectorPosY4;

var door = 0;

var ChooseWallDelete = 0;
var ChooseDot = 0;
var DeleteWallie = 0;
var ChooseSectorDeleteV = 0;

var ChooseSector = 0; // Variable to activate for choosing sectors to add them to Rooms

var ChooseDelete = 0;
var ChooseSectorPoints = 0;
var Sector_id_to_delete = 999;   // Delete this sector ID 

var PosX;
var PosY;
var LenX;
var LenY;
var SectorName;
var SecArr = [[]];  //the [0][0] --> Sector Name; [0][1] --> PosX; [0][2] --> PosY; [0][3] --> LenX; [0][4] --> LenY; [0][5] --> Room_id;
var Sector_id = 0;  // The Sector Id starts from 0 
var Room_id = 0;    // By default all the sectors are in room_id =  0; Later it will be changed accordingly. 


//////////////////////////////////////////////////// I have to increment the room_id before adding the room.. the first room_id shoudl be 1 



var hashX = new Object();
var hashY = new Object();
var r = 4;
var divWidth = $("#container").css('width').replace(/[^-\d\.]/g, '');;
// var divHeight = $(divToResize).css('height',$("#container").innerHeight());
// alert(divHeight);


var userWidth = window.localStorage.getItem("userW");
var userHeight = window.localStorage.getItem("userH");
var windowWidth = window.localStorage.getItem("windowW");
var windowHeight = window.localStorage.getItem("windowH");
var buildingName = window.localStorage.getItem("buildingN");
var textBase64 = "Building Name : " + buildingName;

var stageWidth = Math.round((72/100)*windowWidth);
var stageHeigth = Math.round((85/100)*windowHeight);
document.getElementById('upper').style.width = stageWidth + "px";
document.getElementById('tools').style.height = windowHeight + "px";




document.getElementById("userW").innerHTML = userWidth;
document.getElementById("userH").innerHTML = userHeight;
document.getElementById("CanvasWidth").innerHTML = divWidth;

//var factor = userWidth/divWidth;   ////////// dELETED FOR TESTING
var factorH = userHeight/stageHeigth;
var factorW = userWidth/stageWidth;
var factor;

if(factorW > factorH){
    factor = factorW;
}else{
    factor = factorH;
}

stageWidth = Math.round(userWidth/factor);
stageHeigth = Math.round(userHeight/factor);

document.getElementById('container').style.width = stageWidth + "px";
document.getElementById('container').style.height = stageHeigth + "px";


document.getElementById("fact").innerHTML = factor;



var stage = new Kinetic.Stage({
    container: 'container',
    width: stageWidth,     //// Edited divWidth 
    height: stageHeigth          //// Edited
});
         
var stage1 = new Kinetic.Stage({
    container: 'upper',
    width: 900,
    height: 40
});

var layer1 = new Kinetic.Layer();
stage1.add(layer1);

var layer = new Kinetic.Layer();
stage.add(layer);




var mouseToText = new Kinetic.Text({
    x: 5,
    y: 5,
    fontFamily: "Arial",
    fontSize: 18,
    fill: "blue",
    stroke: null,
    text: "Map Maker (INALSI)"
});
layer1.add(mouseToText);

document.getElementById('X').innerHTML = currX;
document.getElementById('Y').innerHTML = currY;

var Text = new Kinetic.Text({
   x: 250,
   y: 10,
   fontFamily: "Arial",
   fontSize: 18,
   fill: "blue",
   stroke: null,
   text: ""
});
layer1.add(Text);
stage1.add(layer1);

var Message = new Kinetic.Text({
    x: 600,
    y: 10,
    fontFamily: "Arial",
    fontSize: 18,
    fill: "blue",
    stroke: null,
    text: ""
})
layer1.add(Message);
stage1.add(layer1);

var PositionText = new Kinetic.Text({
   x: 5,
   y: 5,
   fontFamily: "Arial",
   fontSize: 12,
   fill: "blue",
   stroke: null,
   text: ""
});
layer.add(PositionText);
stage.add(layer);



var circle_mouse_over = function(){
       this.setFill('orange');
       layer.draw();
       
      
       PositionText.setX(this.getX()-15);
       PositionText.setY(this.getY()-15);
       PositionText.setText("(" + hashX[this.getX()] + "," + hashY[this.getY()] + ")");
       layer.drawScene();
       
       Text.setText("Point(" + hashX[this.getX()] + "," + hashY[this.getY()] + ")");
       layer1.drawScene();
   };

var circle_mouse_out = function(){
        if(special){
            if(this.getName()=="startCircle"){
                this.setFill('red');
                layer.draw();
            }else{
                this.setFill('red');
                layer.draw();
            }
        }else{
            this.setFill('black');
            layer.draw();
        }
        
        PositionText.setX(10);
        PositionText.setY(10);
        PositionText.setText("");
        layer.drawScene();
        
        if(!ChooseSectorPoints){
            show_point_position_on_top();
            // Text.setText("Current Position X = " + currX + "  Y = " + currY);
            // layer1.drawScene();
        }
    };


var circle_mouse_down = function(){

            ///// for current highlight feature 
            // var decolor_last_circle = stage.get("#current")[0];
            // decolor_last_circle.setRadius(r);
            // decolor_last_circle.setId("NotCurrent");
            // layer.drawScene();
            if(ChooseDelete){ special = 1; }
            
            
            if(ChooseDelete && this.getName()=="startCircle"){
               // To deal with highlighting the circle while deleting
                this.setFill("red");
                ChooseDelete = 0;
                this.setName('del');
                layer.drawScene();
            }else{

                Xcircle = stage.get('#'+'currentPoint')[0];
                if(Xcircle!=undefined){
                Xcircle.setId('NotCurrent');
                Xcircle.setRadius(r);
                layer.drawScene();
                }

                this.setId('currentPoint');
                this.setRadius(r+2);
                layer.drawScene();
            }
            
            RcurrX = this.getX();
            RcurrY = this.getY();
            currX = hashX[RcurrX];
            currY = hashY[RcurrY];
            
            document.getElementById('X').innerHTML = Math.round(currX);
            document.getElementById('Y').innerHTML = Math.round(currY);
            Text.setText("Current Position : (" + currX + "," + currY + ")");
            // this.setRadius(r+2);  //////// for current hightlight feature 
            // this.setId("current"); ///// for current highlight feature 
            // layer.drawScene();
            layer1.drawScene();
           
            
            
        if(ChooseSectorPoints){
                Message.setText("Point " + SectorStart + " Choosen");
                Message.setFill("blue");
                layer1.drawScene();
             //alert(SectorStart);
            if(SectorStart==1){
               // alert("pu");


                RsectorPosX1 = this.getX();
                RsectorPosY1 = this.getY();
                SectorPosX1 = hashX[this.getX()];
                SectorPosY1 = hashY[this.getY()];


                SectorStart++;
    //            alert(SectorPosX1);
    //            alert("pu");
                document.getElementById('SectorposX').innerHTML = SectorPosX1;
                document.getElementById('SectorposY').innerHTML = SectorPosY1;

                PosX = SectorPosX1;
                PosY = SectorPosY1;

                // document.getElementById('SectorposX1').innerHTML = SectorPosX1;
                // document.getElementById('SectorposY1').innerHTML = SectorPosY1;

            }
            else if(SectorStart=="2"){
    //            SectorPosX2 = this.getX();
    //            SectorPosY2 = this.getY();

                RsectorPosX2 = this.getX();
                RsectorPosY2 = this.getY();

                SectorPosX2 = hashX[this.getX()];
                SectorPosY2 = hashY[this.getY()];


                SectorStart++;

                if(SectorPosX1==SectorPosX2){
                   document.getElementById('SectorlenY').innerHTML = Math.abs(SectorPosY2 - SectorPosY1); 
                   LenY = Math.abs(SectorPosY2-SectorPosY1);
                }
                else if(SectorPosY1==SectorPosY2){
                   document.getElementById('SectorlenX').innerHTML = Math.abs(SectorPosX2 - SectorPosX1);
                   LenX = Math.abs(SectorPosX2 - SectorPosX1); 
                }
                else{
                    alert("Error : Adjacent point is not choosen");
                }

                // document.getElementById('SectorposX2').innerHTML = SectorPosX2;
                // document.getElementById('SectorposY2').innerHTML = SectorPosY2;

            }
            else if(SectorStart=="3"){

                RsectorPosX3 = this.getX();
                RsectorPosY3 = this.getY();
                SectorPosX3 = hashX[this.getX()];
                SectorPosY3 = hashY[this.getY()];
                SectorStart++;


                if(SectorPosX2==SectorPosX3){
                   document.getElementById('SectorlenY').innerHTML = Math.abs(SectorPosY2 - SectorPosY3);
                   LenY = Math.abs(SectorPosY2 - SectorPosY3);
                }
                else if(SectorPosY3==SectorPosY2){
                   document.getElementById('SectorlenX').innerHTML = Math.abs(SectorPosX3 - SectorPosX2);
                   LenX = Math.abs(SectorPosX3 - SectorPosX2);
                }
                else{
                    alert("Error : Adjacent point is not choosen");
                }

                // document.getElementById('SectorposX3').innerHTML = SectorPosX3;
                // document.getElementById('SectorposY3').innerHTML = SectorPosY3;
            }
            else if(SectorStart=="4"){
                RsectorPosX4 = this.getX();
                RsectorPosY4 = this.getY();
                SectorPosX4 = hashX[this.getX()];
                SectorPosY4 = hashY[this.getY()];
                SectorStart++;

                // document.getElementById('SectorposX4').innerHTML = SectorPosX4;
                // document.getElementById('SectorposY4').innerHTML = SectorPosY4;
            }
        }
    };

var LineGroup_mouse_down = function(){
            if(ChooseDelete){
                special = 1; // To deal with highlighting the circle while deleting
                //this.setFill("red");
                ChooseDelete = 0;
                this.setName('del');
                this.setOpacity('0.2');
                layer.drawScene();

                Message.setText("Line Choosen to Delete");
                Message.setFill("blue");
                layer1.drawScene();
            }


}



var line_mouse_over = function(){

    //alert(this.getPoints()[0].x);
    var midX = (this.getPoints()[0].x + this.getPoints()[1].x)/2;
    var midY = (this.getPoints()[0].y + this.getPoints()[1].y)/2;
    var displayLen;
    if(this.getPoints()[0].x == this.getPoints()[1].x){
    	displayLen = Math.abs(hashY[this.getPoints()[0].y] - hashY[this.getPoints()[1].y]);
    }else{
    	displayLen = Math.abs(hashX[this.getPoints()[0].x] - hashX[this.getPoints()[1].x]);
    }
    
    PositionText.setX(midX);
    PositionText.setY(midY);
    PositionText.setText(displayLen + " cm");
    layer.drawScene(); 
    if(this.getId()=="door"){
        Text.setText(this.getName() + " Door Length is " + displayLen + " cm");
        layer1.drawScene();
    }else{
        Text.setText("Wall Length is " + displayLen + " cm");
        layer1.drawScene();
    }
};



var line_mouse_out = function(){

        PositionText.setX(10);
        PositionText.setY(10);
        PositionText.setText("");
        layer.drawScene();
        
       
            Text.setText("Current Position : (" + currX + "," + currY + ")");
            layer1.drawScene();
    };

var line_mouse_down = function(){
        // if(ChooseDelete){
        //     this.setStrokeWidth(7);
        //     ChooseDelete = 0;
        //     this.setName('del');
        //     layer.drawScene();
        // }       
    };


var temp_list_of_sector_id = "";

var poly_mouse_down = function(){        
        if(ChooseDelete){
            this.setFill("red");
            this.setOpacity(0.7);
            layer.drawScene();
            Sector_id_to_delete = this.getId();
            ChooseDelete = 0;
        }
        if(ChooseSector){
            this.setFill("green");
            this.setOpacity(0.2);
            layer.drawScene();
            //testing = this.getName();
            SecArr[Number(this.getId())][5] = Room_id;
            temp_list_of_sector_id = temp_list_of_sector_id + this.getId() + "; ";
        }
    };

var poly_mouse_over = function(){
    testing = this.getId();
    Text.setText(this.getName() + " Sector" + " (Sector ID = " + this.getId()+ ")");
    layer1.drawScene();
}

var poly_mouse_out = function(){
    Text.setText("Current Position : (" + currX + "," + currY + ")");
    layer1.drawScene();

}







function show_point_position_on_top(){
    Text.setText("Current Position : (" + currX + "," + currY + ")");
    layer1.drawScene();
}
    
function EnterPoints(){
    currX = document.getElementsByName("Xin")[0].value;
    currY = document.getElementsByName("Yin")[0].value;

    document.getElementById('X').innerHTML = currX;
    document.getElementById('Y').innerHTML = currY;
    
    RcurrX = Math.round(currX/factor);
    RcurrY = Math.round(currY/factor);
    
    hashX[RcurrX] = currX;
    hashY[RcurrY] = currY;

    var checkPreviousCurrent = stage.get('#'+'currentPoint')[0];
    if(checkPreviousCurrent!=undefined){
        checkPreviousCurrent.setId('NotCurrent');
        checkPreviousCurrent.setRadius(r);
        layer.drawScene();
    }

    var circ = new Kinetic.Circle({
        x: RcurrX,
        y: RcurrY,
        radius: r+2,
        fill: 'black',
        name: 'startCircle',
        id: 'currentPoint'
    });
    layer.add(circ);
    stage.add(layer);
    
     circ.on('mouseover', circle_mouse_over);  
     circ.on('mouseout', circle_mouse_out);  
     circ.on('mousedown', circle_mouse_down);
     show_point_position_on_top();    
}


function chooseSectorPoints(){
    ChooseSectorPoints = 1;
    SectorStart = 1;
    SectorPosX1 = 0;
    SectorPosY1 = 0;
    SectorPosX2 = 0;
    SectorPosY2 = 0;
    SectorPosX3 = 0;
    SectorPosY3 = 0;
    SectorPosX4 = 0;
    SectorPosY4 = 0;
    
    Message.setText("Choose Sector Points");
    Message.setFill("blue");
    layer1.drawScene();
}

// $("#drawLine").on("click", function(e) {
//     e.preventDefault();

//     // the rest of your code ...
//     });
 
function DrawLine(){
    var direction;
    var newX;
    var newY;
    len = document.getElementById("linelength").value;
    var Rlen = Math.round(len/factor);
    
    for(var i=0; i<4;i++){
        if(document.getElementsByName("direction")[i].checked){
            direction=document.getElementsByName("direction")[i].value;
        }
    }
    
    if(direction=="left"){
        RnewX = RcurrX-Rlen;
        RnewY = RcurrY;
        
        newX = currX-len;
        newY = currY;
       
    }
    else if(direction=="right"){
        
        RnewX = Number(RcurrX) + Number(Rlen);
        RnewY = RcurrY;
        
        newX = Number(currX) + Number(len);
        newY = currY;
    }
    else if(direction=="top"){
        RnewX = RcurrX;
        RnewY = RcurrY - Rlen;
        
        newX = currX;
        newY = currY - len;
    }
    else if(direction=="bottom"){
        RnewX = RcurrX;
        RnewY = Number(RcurrY) + Number(Rlen);
        
        newX = currX;
        newY = Number(currY) + Number(len);
    }
    
    if(door){
        //alert("door");
        doorName = document.getElementsByName("doorName")[0].value;
        var newLine = new Kinetic.Line({
        points: [RcurrX, RcurrY, RnewX, RnewY],
        stroke: 'red',
        dashArray: [4, 2],
        name: doorName,
        id: "door"
        });
        door = 0;
    }else{
        //alert("wall");
        var newLine = new Kinetic.Line({
            points: [RcurrX, RcurrY, RnewX, RnewY],
            stroke: 'red',                
        });
    }
    
    //layer.add(newLine);
    //stage.add(layer);
    
    var circle = new Kinetic.Circle({
        x: RcurrX,
        y: RcurrY,
        radius: r,
        fill: 'black'
    });
    //layer.add(circle);
    //stage.add(layer);    
    
    RcurrX = RnewX;
    RcurrY = RnewY;
    
    currX = newX;
    currY = newY;
    
     document.getElementById('X').innerHTML = Math.round(currX);
     document.getElementById('Y').innerHTML = Math.round(currY);
     // Text.setText("Current Position X = " + currX + "  Y = " + currY);
     // layer1.drawScene();
     show_point_position_on_top();
    
    hashX[RcurrX] = currX;
    hashY[RcurrY] = currY;

    Xcircle = stage.get('#'+'currentPoint')[0];
    Xcircle.setId('NotCurrent');
    Xcircle.setRadius(r);
    layer.drawScene();

    
    var circle1 = new Kinetic.Circle({
        x: RcurrX,
        y: RcurrY,
        radius: r+2,
        fill: 'black',
        id: 'currentPoint'
    });
    //layer.add(circle1);
    //stage.add(layer);
    
    var LineGroup = new Kinetic.Group();
    LineGroup.add(newLine);
    LineGroup.add(circle);
    LineGroup.add(circle1);
    
    layer.add(LineGroup);
    stage.add(layer);
    



     circle.on('mouseover', circle_mouse_over);
     circle.on('mouseout', circle_mouse_out);    
     circle1.on('mouseover', circle_mouse_over);
     circle1.on('mouseout', circle_mouse_out);
    
    newLine.on('mouseout', line_mouse_out);    
    newLine.on('mousedown', line_mouse_down);
    newLine.on('mouseover', line_mouse_over);
    
    circle.on('mousedown', circle_mouse_down);
    circle1.on('mousedown', circle_mouse_down);  

    LineGroup.on('mousedown', LineGroup_mouse_down);


    

    


    
} 



function  AddSector(){
    if(SectorStart=="4"){
       xlen = Math.max(Math.abs(RsectorPosX1-RsectorPosX2),Math.abs(RsectorPosY1-RsectorPosY2));
       if(RsectorPosX2==RsectorPosX3){
            if(RsectorPosX1 < RsectorPosX2){
                RsectorPosX4 = Number(RsectorPosX3) - Number(xlen);
                RsectorPosY4 = RsectorPosY3;
            }else{
                RsectorPosX4 = Number(RsectorPosX3) + Number(xlen);
                RsectorPosY4 = RsectorPosY3;  
            }
        }else{
            if(RsectorPosY1 < RsectorPosY2){
                RsectorPosX4 = RsectorPosX3;
                RsectorPosY4 = Number(RsectorPosY3) - Number(xlen);
            }else{
                RsectorPosX4 = RsectorPosX3;
                RsectorPosY4 = Number(RsectorPosY3) + Number(xlen);                
            } 
        }
    }
    
            SectorName = document.Sector.name.value;
            var poly = new Kinetic.Polygon({
                points: [RsectorPosX1, RsectorPosY1, RsectorPosX2, RsectorPosY2, RsectorPosX3, RsectorPosY3, RsectorPosX4, RsectorPosY4],
                fill: 'orange',
                opacity: 0.5,
                name: SectorName,
                id: Sector_id
            });
            layer.add(poly);
            stage.add(layer);
            
            poly.on('mousedown', poly_mouse_down);
            poly.on('mouseover', poly_mouse_over);
            poly.on('mouseout', poly_mouse_out);

             $('#myModal').modal('toggle');
             // $('#myModal').modal('backdrop');



            
            
           // alert("Sector_id is " + Sector_id);
            document.getElementById('sectorID').innerHTML = Sector_id;
            document.getElementById('sectorName_span').innerHTML = SectorName;
            
            SecArr[Sector_id][0] = SectorName;
            SecArr[Sector_id][1] = PosX;
            SecArr[Sector_id][2] = PosY;
            SecArr[Sector_id][3] = LenX;
            SecArr[Sector_id][4] = LenY;
            SecArr[Sector_id][5] = Room_id;

            Sector_id++;
            SecArr[Sector_id] = [];

            
                
        
        ChooseSectorPoints = 0;
        Message.setText("");
        layer1.drawScene();
                
        SectorPosX1 = 0;
        SectorPosY1 = 0;
        SectorPosX2 = 0;
        SectorPosY2 = 0;
        SectorPosX3 = 0;
        SectorPosY3 = 0;
        SectorPosX4 = 0;
        SectorPosY4 = 0;
    }
    

    function ChooseWall(){
        ChooseDelete = 1;
        Message.setText("Choose Object to Delete");
        Message.setFill("blue");
        layer1.drawScene();
    }
   
    
    function DeleteObject(){
        if(Number(Sector_id_to_delete) != 999){
            alert("delete");
            var idDel = stage.get('.'+Sector_id_to_delete)[0];
            Sector_id_to_delete = 999; 
        }else{
            var idDel = stage.get('.del')[0];
        }
            idDel.remove();
            layer.draw();        
            Message.setText("");
            layer1.drawScene();
            DeleteWallie = 1;

            special = 0;
        
    }
  
    function SaveJSON(){
       var json = stage.toJSON();
       var filename = "JSON.txt";
       saveAsTxtfile(json,filename);
    }

    // function SaveBase64(){
    //     stage.toDataURL({
    //       callback: function(dataUrl) {
    //         var filename = "base64.txt";
    //         textBase64 = textBase64 + "\n" + dataUrl;
    //         saveAsTxtfile(textBase64,filename);
           
    //       }
    //     });
    // }
    
    function saveAsTxtfile(vari,filename){
        // grab the content of the form field and place it into a variable
            var textToWrite = vari;
        //  create a new Blob (html5 magic) that conatins the data from your form feild
            var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        // Specify the name of the file to be saved
            var fileNameToSaveAs = filename;
            
        // Optionally allow the user to choose a file name by providing 
        // an imput field in the HTML and using the collected data here
        // var fileNameToSaveAs = txtFileName.text;

        // create a link for our script to 'click'
            var downloadLink = document.createElement("a");
        //  supply the name of the file (from the var above).
        // you could create the name here but using a var
        // allows more flexability later.
            downloadLink.download = fileNameToSaveAs;
        // provide text for the link. This will be hidden so you
        // can actually use anything you want.
            downloadLink.innerHTML = "My Hidden Link";
            
        // allow our code to work in webkit & Gecko based browsers
        // without the need for a if / else block.
            window.URL = window.URL || window.webkitURL;
                  
        // Create the link Object.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        // when link is clicked call a function to remove it from
        // the DOM in case user wants to save a second file.
            downloadLink.onclick = destroyClickedElement;
        // make sure the link is hidden.
            downloadLink.style.display = "none";
        // add the link to the DOM
            document.body.appendChild(downloadLink);
            
        // click the new link
            downloadLink.click();



    }           


    function destroyClickedElement(event){

        // remove the link from the DOM
            document.body.removeChild(event.target);
    }



    
    
    
    function DrawDoor(){
        door = 1;
        DrawLine();
    }


    var XML=new XMLWriter();
    XML.BeginNode("building");
    XML.Attrib("name", buildingName);
    XML.Attrib("version", "1");
    
    //XML.WriteString("This is an example of the JS XML WriteString method.");
    //XML.Node("Name", "Value");
    XML.BeginNode("imageData");
    XML.BeginNode("floor");
    XML.Attrib("no", "4");

    XML.EndNode();
    XML.BeginNode("SubNode3");
    XML.WriteString("Blah blah.");
    XML.EndNode();
    XML.Close(); // Takes care of unended tags.
    // The replace in the following line are only for making the XML look prettier in the textarea.
    console.log(XML.ToString());
   
    //document.getElementById("ExampleOutput").value=XML.ToString().replace(/</g,"\n<");
    
    
    
   function SaveBase64(){
   			   var filename = "pushpak.XML";
    //         textBase64 = textBase64 + "\n" + dataUrl;
    //         saveAsTxtfile(textBase64,filename);
    		   saveAsTxtfile(XML.ToString().replace(/</g,"\n<"),filename);


   }

   function ChooseSector4Room(){
        //alert("Inside Choose Sector");
        ChooseSector = 1;  
        Message.setText("Choose Sectors");
        Message.setFill("blue");
        layer1.drawScene();       

   }

   function AddRoom(){
        ChooseSector = 0;
        //alert(temp_list_of_sector_id);
        
        $('#roomModal').modal('toggle');
        document.getElementById('roomID').innerHTML = Room_id;
        document.getElementById('sectorIDs_room_span').innerHTML = temp_list_of_sector_id;



        Room_id++;
        temp_list_of_sector_id = "";

        Message.setText("");
        layer1.drawScene();
   }
        
        










