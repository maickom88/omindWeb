//Listen for Auth staus changes
auth.onAuthStateChanged(user => {
    if(user){
        console.log('User logged in: ',user);

    }else{
        console.log('User logged out ');
        window.location.href="auth_login.php";
    }
});


//Logout
const logoutbtn = document.querySelector('#logout');

logoutbtn.addEventListener('click',(e)=>{
  e.preventDefault();
    auth.signOut();

});





//    // real-time listener
//    db.collection('Lifepacks').collection('Questions').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         console.log(change.doc.data());
//         if(change.type == 'added'){
//             renderLifePackQuestions(change.doc);
//         } else if (change.type == 'removed'){
//             let li = lifepackList.querySelector('[data-id=' + change.doc.id + ']');
//             lifepackList.removeChild(li);
//         }
//     });
// });

// const ul = document.querySelector('.lifepacks');
// // create element & render cafe
// function renderLifePackQuestions(doc){
//     const lp = doc.data();
//     let li = document.createElement('li');
//     li.classList.add('list-group-item','ist-group-item-action','m-2');
//     let div1 = document.createElement('div');
//     div1.classList.add('media');
//     let h4 = document.createElement('h4');
//     h4.classList.add('media-heading');
//     h4.innerHTML = lp.LifePackName;

//     let p = document.createElement('p');
//     p.classList.add('media-text');
//     p.innerHTML = lp.Description;

//     let div2 = document.createElement('div');
//     div2.classList.add('media-notation','float-right');
//     let s1 = document.createElement('button');
//     s1.classList.add('btn');
//     s1.innerHTML = 'Edit';
//     let s2 = document.createElement('button');
//     s1.style.margin = "30px";
//     s2.innerHTML = 'Delete';
//     s2.classList.add("delete","btn","btn-danger");
// //funvtion to create svg
// // let SVG=function(h,w){
// //     let NS="http://www.w3.org/2000/svg";
// //     let svg=document.createElementNS(NS,"svg");
// //     svg.width=w;
// //     svg.height=h;
// //     return svg;
// //    }
// //    var svg1=SVG(24,24);
// //     let div2 = `
// //     <div class="media-notation float-right"> 
// //     <a href="javascript:void(0);" class=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> Edit </a>
// //     <a href="javascript:void(0);" class="delete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> Delete </a>
// // </div>
// //     `;

//     li.setAttribute('data-id', doc.id);
//     // name.textContent = doc.data().name;
//     // city.textContent = doc.data().city;
//     // cross.textContent = 'x';

//     li.appendChild(div1);
//     li.appendChild(h4);
//     li.appendChild(p);
//     div2.appendChild(s1);
//     div2.appendChild(s2);
//     ul.appendChild(li);
//     li.appendChild(div2);

//     // deleting data
//         // const delBtn = document.querySelector('.delete');
//        s2.addEventListener('click', (e) => {
//         e.stopPropagation();
//      //get data-id attribute in plain Javascript
//       var dataID = li.getAttribute('data-id');
 
//      //get data-id 
//      db.collection('Lifepacks').doc(dataID).documentSnapshot.;
    
//   });

//   //Add Question Page
//    s1.addEventListener('click',(e)=>{
//     e.preventDefault();
//     var dataID = li.getAttribute('data-id');
//     localStorage.setItem("dataId",dataID);
//     console.log(dataID);
//     window.location.href = "lifepackQuestions.php";
//    });

// };






let dataId = localStorage.getItem("dataId");  
console.log(dataId);