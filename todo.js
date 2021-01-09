//Created on 19/12/2020
//Program For Corona Safe Felloswhip 2020...
//My first ever try with Nodejs

const commands=["add","del","done","ls","report","help"];
const fs=require('fs');
const argss=process.argv;
const add_=()=>
{
	if(argss[3])
	{
		var data=argss.slice(3);
		data=(data.join(" "));
		if(fs.existsSync("todo.txt"))
			{
			fs.appendFile("todo.txt",(data+"\n"),(err)=>{if (err) throw (err);});
			}
		else
		    {
			fs.writeFile("todo.txt",(data+"\n"),(err)=>{if (err) throw (err);});
	            }
		console.log("Added todo: "+"\""+data+"\"");
	}
	else
	{
		console.log("Error: Missing todo string. Nothing added!");
	}
}
const del_=()=>
{
	if(argss[3])
	{
		var read=fs.readFileSync("todo.txt","utf-8");
		if(argss[3]!=0 && argss[3]<=((read.split("\n")).length)-1)
		{
		//read.split('\n') =>To convert the string to an array with the newline character as seperator
		//Must be >2 because an empty list will still add a white space and a new line character
		if(read.split("\n").length>2)
		{
		    console.log("DELETED"+argss[3]);
                    read=read.replace((read.split("\n"))[argss[3]-1],'');
		    read=read.split("\n");
		    read=read.filter(function(e){return e;});
		    read=read.toString();
		    var myRegEx=/\,/g;
		    read=read.replace(myRegEx,"\n")+"\n";
		    console.log("Deleted todo \#"+argss[3]);
		    fs.writeFile("todo.txt",read,(err)=>{if (err) throw (err);});
		}
		    //Case where the list is empty
		    else
			{
		          read='';
		          fs.writeFile("todo.txt",read,(err)=>{if(err) throw(err);});
			  console.log("Deleted todo \#"+argss[3]);
			}
		}
		else
		{ 
		    console.log("Error: todo" + " \#"+argss[3]+" does not exist. Nothing deleted.");

		}
	}
        else
	{
	        console.log("Error: Missing NUMBER for deleting todo.");
        }
 }

const report_=()=>
{
	if(fs.existsSync("todo.txt"))
	{
	var read_todo=fs.readFileSync("todo.txt","utf-8");
	read_todo=read_todo.split("\n");
	read_todo=read_todo.filter(function (e) {return e;});
	}
	else
		{var read_todo=0;}
        if(fs.existsSync("done.txt"))
	{
	var read_done=fs.readFileSync("done.txt","utf-8");
	read_done=read_done.split("\n");
	read_done=read_done.filter(function(e){return e;});
	}
	else
	       {var read_done=0;}
	var date_now=new Date().toISOString().slice(0,10);
	console.log(date_now+" Pending : "+read_todo.length+" Completed : "+read_done.length);

}
const ls_=()=>{
	if(fs.existsSync("todo.txt")){
	var read=fs.readFileSync("todo.txt","utf-8");
	read=read.split("\n");
	read=read.filter(function(e){return e;});
	read.reverse();
	for(i=0;i<read.length;i++){
	console.log("["+(read.length-i)+"] "+read[i]);
	}
	}
	else{console.log("There are no pending todos!");}
}
const done_=()=>
{
	if(argss[3])
	{
	var read=fs.readFileSync("todo.txt","utf-8");
	var myregex=/\,/g;
	//data here is converted to an array from string and is basically the array element of the specified number
	var data=(read.split("\n"))[argss[3]-1];
	//Condition to check valid inputs
	//Here the second condition checks the length of the  file data in array form(-1 to eliminate trailing '\n')
	    if(argss[3]!=0 && argss[3]<=read.split("\n").length-1)
	    {
		console.log("Marked todo \#"+argss[3]+" as done.");
		if(read.split("\n").length>2)
		{
                   read=read.replace(data,'');
                   read=read.split("\n");
		   read=read.filter(function(e){return e!=undefined;});
	           read=read.filter(function(e){return e;});
                   read=read.toString();
	           read=read.replace(myregex,"\n")+"\n";
	           fs.writeFile("todo.txt",read,(err)=>{if(err) throw(err);});
		}
		else
		{
                  read='';
		  fs.writeFile("todo.txt",read,(err)=>{if(err) throw(err);});
		}
	   }
	   else{console.log("Error: todo \#"+argss[3]+" does not exist.");}
	   var date=new Date().toISOString().slice(0,10);
	   data="x "+date+" "+data+"\n";
           if(fs.existsSync("done.txt"))
	   {
		fs.appendFile("done.txt",data,(err)=>{if (err) throw (err);});
	   }
	   else
	   {
		fs.writeFile("done.txt",data,(err)=>{if (err) throw(err);});
	   }
	}
else
    {console.log("Error: Missing NUMBER for marking todo as done.");}
}
const usage_=()=>{
var text="StringContaining Usage :-"                   + "\n" +
    "\$ ./todo add \"todo item\"  \# Add a new todo"       + "\n" +
    "\$ ./todo ls               \# Show remaining todos"   + "\n" +
    "\$ ./todo del NUMBER       \# Delete a todo"          + "\n" +
    "\$ ./todo done NUMBER      \# Complete a todo"        + "\n" +
    "\$ ./todo help             \# Show usage"             + "\n" +
    "\$ ./todo report           \# Statistics"
console.log(text);}
if(argss.length>2 && commands.indexOf(argss[2])!=-1){
switch(argss[2]){
           case "add":
                  add_();
                  break;
           case "del":
                  del_();
                  break;
           case "done":
                  done_();
                  break;
           case "ls":
                  ls_();
                  break;
           case "report":
                 report_();
                  break;
           case "help":
                 usage_();
                 break;
	case    (''):
                 usage_();
                 break;               
}
}
else{
	usage_();}
