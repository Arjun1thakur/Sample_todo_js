let data=[];
let title_btn = document.querySelector('#add_title');
let title = document.querySelector('#add_task_title');
let add_taskInCard=document.querySelector('#add_taskInCard');
let container=document.querySelector('.container')
let sep_val=document.querySelector(".specific");
let i=0;
let val0;
title_btn.addEventListener('click',()=>{
    let name = title.value
    let ids=Date.now()
    const tempObj={
        id:ids,
        title:name,
        content:new Set()
    }
    data.push(tempObj);
    addTask();
})
function main_list(){
    for(obj of data){
        if(obj.id==val0){
            obj.content.add(add_taskInCard.value)
        }
    }
    var cloned_list = document.querySelector(".tr").cloneNode(true);
    cloned_list.innerHTML =  `<h3>${add_taskInCard.value}</h3>`; 
    cloned_list.setAttribute('id',`${Date.now()}`);
    cloned_list.setAttribute('value',`${Date.now()}`);
    var done_button = document.createElement('button');
    done_button.setAttribute('id',`btn_dn${Date.now()}`);
    done_button.setAttribute('class','done_Task');
    done_button.setAttribute('value',`${Date.now()}`);
    done_button.setAttribute('onclick','taskdone(this.value)');
    done_button.innerText = 'Done';
    cloned_list.appendChild(done_button);
    cloned_list.setAttribute('onClick',"taskdone(this.value)");
    
    document.getElementById(`${val0}`).getElementsByClassName('content')[0].appendChild(cloned_list).appendChild(done_button);
    close_popup_card()
}
function addTask(){
    var first_card = document.querySelector('.card').cloneNode(true);
    display_card(first_card);
}
function display_card(card){
    data.forEach(ele => {
        card.id = ele.id;
        card.querySelector("#title").innerHTML = ele.title;
        card.querySelector("#title").setAttribute('value',`${ele.id}`);
        card.setAttribute("value",`${ele.id}`);
        card.querySelector(".delete").setAttribute("value",`${ele.id}`);
        card.querySelector(".delete").setAttribute("onclick","deleteCard(this.value)");
        card.querySelector(".edit").setAttribute("value",`${ele.id}`);
        card.querySelector(".edit").setAttribute("onclick","addSubtask(this.value)");
    });

    card.style.display = "block";
    document.querySelector(".cards").appendChild(card);
    close_popup()
}

function check(){
    if(data.length==0){
        document.querySelector('.content_box').innerHTML = 'No Items in the todo list'
    }else{
        document.querySelector('.content_box').style.display = 'none'
    }
}
setInterval(()=>{
    check();
},0)


function addTask_popup(){
    let pop_window=document.querySelector('.blur1');
    pop_window.style.display='block'
};

function close_popup(){
    let pop_window=document.querySelector('.blur1');
    pop_window.style.display='none'
};

function close_popup_card(){
    let pop_window=document.querySelector('.blur2');
    pop_window.style.display='none'
};

function deleteCard(main){
    var delete_div = document.getElementById(`${main}`);
    for(obj of data){
        if(obj.id==main){
            data.splice(data.findIndex(obj => obj.id == main) , 1)
        }
    }
delete_div.parentNode.removeChild(delete_div);
}

function addSubtask(val){
    let pop_window=document.querySelector('.blur2');
    pop_window.style.display='block'
    val0=val
};

function taskdone(value){
    let stc=document.getElementById(`${value}`)
    stc.classList.add('stc')
    document.getElementById(`btn_dn${value}`).style.display="none";
}
function only_card(){
    document.querySelector('.card').style.display= "block";
}

function only_card(val){
    var cardHeader;
    for(let ele of data){
        for(let id in ele){
            if(ele[id]==val){
                cardHeader = ele.title;
                break;
            };
        };
    };
    document.querySelector("#back_title_ico").innerHTML = `<h1 style="cursor: pointer;" onclick="hidden0()"><span><i class="fa-solid fa-circle-chevron-left"></i></span> Back</h1>`;
    for(let ele of data){
            if(ele.id==val){
                document.getElementById(`${ele.id}`).style.display = 'block';
            }
            else {
                document.getElementById(`${ele.id}`).style.display = 'none';
            }
    };
    document.getElementById('title').innerText = `${cardHeader}`;
};
function hidden0(){
    document.querySelector("#back_title_ico").innerHTML = '<h1 id="back_title_ico"><span>Tasks</span> List</h1>';
    for(let ele of data){
            document.getElementById(`${ele.id}`).style.display = 'block';
    };
    console.log(data)
}