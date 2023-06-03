showSlides();
function showSlides()
{
    // let i=0;
    // let slides=document.getElementsByClassName("box");
    // // for(i=0;i<slides.length;i++)
    // // {
    // //     slides[i].style.display="none";
    // // }
    // i++;
    // if(i > slides.length)
    // {i=1;}
    // slides[i-1].style.display="block";
    let s1=document.getElementsByClassName(".container2 ");
    let s2=document.getElementsByClassName(".container2 ");
    let s3=document.getElementsByClassName(".container2 ");
    s1.style.display="none";
    s2.style.display="none";
    s3.style.display="none";
    setTimeout(showSlides,2000);
}
function msg()
{
    const n=document.getElementById("msg");
    n.style.display="block";
    console.log("done");
    // setTimeout(msg,100);
}
function f1()
{
    const n=document.getElementById("f1");
    if(n.style.display=="block")
    {

        n.style.display="none";
        console.log("done");
    }
    else{
        n.style.display="block";
        console.log("done");
    }
    // setTimeout(msg,100);
}