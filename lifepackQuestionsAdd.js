//Listen for Auth staus changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in: ', user);

    } else {
        console.log('User logged out ');
        window.location.href = "auth_login.php";
    }
});

var n = auth.currentUser;


//Logout
const logoutbtn = document.querySelector('#logout');

logoutbtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();

});


var numberOption = 4;

var idDocQuestion = localStorage.getItem('idDocQuestion');
if (idDocQuestion != null) {
    console.log(idDocQuestion);
    loadQuestion(idDocQuestion);

}

function loadQuestion(idDoc) {
    var docRefLife = localStorage.getItem("dataId");
    db.collection("Lifepacks").doc(docRefLife).collection('Questions').doc(idDoc).get()
        .then(function(doc) {
            var type = doc.data().type;
            if (type == 'Mcq Questions') {
                document.querySelector('#nameQuestion').value = doc.data().nameQuestion;
                document.querySelector('#desc').value = doc.data().desQuestion;
                document.querySelector('#answer').value = doc.data().answer;
                listOp = doc.data().listOptions;
                console.log(listOp);
                for (let index = 0; index < listOp.length; index++) {

                    document.querySelector('#option' + (index + 1)).value = listOp[index];
                    if (index > 3) {
                        var add = document.querySelector('#addOption');
                        add.click();
                    }
                }

            } else if (type == 'Timer Question') {
                document.querySelector('#nameQuestion').value = doc.data().nameQuestion;
                document.querySelector('#desc').value = doc.data().desQuestion;
                document.querySelector('#timer').value = doc.data().timer;
                document.querySelector('#answer').value = doc.data().answer;
                listOp = doc.data().listOptions;
                console.log(listOp);
                for (let index = 0; index < listOp.length; index++) {

                    document.querySelector('#option' + (index + 1)).value = listOp[index];
                    if (index > 3) {
                        var add = document.querySelector('#addOption');
                        add.click();
                    }
                }

            } else if (type == 'Range Slider Question') {
                document.querySelector('#nameQuestion').value = doc.data().nameQuestion;
                document.querySelector('#desc').value = doc.data().desQuestion;
                document.querySelector('#valueInitial').value = doc.data().valueInitial;
                document.querySelector('#valueFinal').value = doc.data().valueFinal;
                document.querySelector('#valueStringInitial').value = doc.data().valueStringInitial;
                document.querySelector('#valueStringFinal').value = doc.data().valueStringFinal;
                document.querySelector('#valueStringMedium').value = doc.data().valueStringMedium;
                document.querySelector('#answer').value = doc.data().answer;
            } else if (type == 'Image Type Question' || type == 'Audio Type Question') {
                document.querySelector('#nameQuestion').value = doc.data().nameQuestion;
                document.querySelector('#desc').value = doc.data().desQuestion;
                document.querySelector('#answer').value = doc.data().answer;
                if (doc.data().listOptions != null) {
                    $('#boxOptions').slideDown();
                    listOp = doc.data().listOptions;
                    console.log(listOp);
                    for (let index = 0; index < listOp.length; index++) {

                        document.querySelector('#option' + (index + 1)).value = listOp[index];
                        if (index > 3) {
                            var add = document.querySelector('#addOption');
                            add.click();
                        }
                    }
                } else {
                    $('#boxText').slideDown();
                    document.querySelector('#blankText').value = doc.data().blankText;
                }
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

$('#addOption').click((e) => {
    e.preventDefault();
    $('#boxOptions').append('<div class="form-group mb-4"><label class="control-label">Option ' + (numberOption + 1) + '</label><input type="text" name="option' + (numberOption + 1) + '" id="option' + (numberOption + 1) + '" class="form-control"></div>');
    numberOption++;
});



var btn = document.querySelector('#lpAddBtn');
var btnImg = document.querySelector('#lpAddBtnImage');
var load = document.querySelector('#load');
var btnRangeSlide = document.querySelector("#lpAddBtnRange");

if (btn != null) {
    btn.addEventListener('click', async(e) => {
        e.preventDefault();
        boxOptions = document.querySelector('#boxOptions');
        quantOptions = boxOptions.querySelectorAll('div');
        var type = sessionStorage.getItem('option');
        var nameQuestion = document.querySelector('#nameQuestion').value;
        var descQuestion = document.querySelector('#desc').value;
        var option1 = document.querySelector('#option1').value;
        var option2 = document.querySelector('#option2').value;
        var option3 = document.querySelector('#option3').value;
        var option4 = document.querySelector('#option4').value;
        if (type == 'Timer Question') {
            var timer = document.querySelector('#timer').value;
        }
        var answer = document.querySelector('#answer').value;
        var listOptions = [];
        for (let index = 0; index < quantOptions.length; index++) {
            listOptions.push(quantOptions[index].querySelector('input').value);
        }
        var lifpacksSelects = document.querySelector('.assings-packs');
        var selects = lifpacksSelects.querySelectorAll('.selectPacks');
        for (let index = 0; index < selects.length; index++) {
            if (timer != null) {
                if (localStorage.getItem('dataId') != selects[index].value) {
                    db.collection('Lifepacks').doc(selects[index].value).collection('Questions').add({
                        nameQuestion: nameQuestion,
                        desQuestion: descQuestion,
                        listOptions,
                        timer: timer,
                        answer: answer,
                        type: type
                    });
                }
            } else {
                if (localStorage.getItem('dataId') != selects[index].value) {
                    db.collection('Lifepacks').doc(selects[index].value).collection('Questions').add({
                        nameQuestion: nameQuestion,
                        desQuestion: descQuestion,
                        listOptions,
                        answer: answer,
                        type: type
                    });
                }
            }
        };
        if (timer != null) {
            db.collection('Lifepacks').doc(localStorage.getItem('dataId')).collection('Questions').add({
                nameQuestion: nameQuestion,
                desQuestion: descQuestion,
                timer: timer,
                listOptions,
                answer: answer,
                type: type
            }).then(() => {
                window.location.href = "lifepack.php";
            });
        } else {
            db.collection('Lifepacks').doc(localStorage.getItem('dataId')).collection('Questions').add({
                nameQuestion: nameQuestion,
                desQuestion: descQuestion,
                listOptions,
                answer: answer,
                type: type
            }).then(() => {
                window.location.href = "lifepack.php";
            });
        }

    });

}

async function uploadImage() {
    var urlImage;
    const ref = firebase.storage().ref();
    const file = document.querySelector('#fileImageQuestion').files[0];
    const name = +new Date() + '-' + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    urlImage = await task
        .then(
            snapshot => snapshot.ref.getDownloadURL())
        .then(
            url => url
        ).catch(console.error);
    return urlImage;
}
//if input form is type image
if (btnImg != null) {
    btnImg.addEventListener('click', async(e) => {
        e.preventDefault();

        btnImg.style.display = 'none';

        load.style.display = 'block';

        var url = await uploadImage();
        boxOptions = document.querySelector('#boxOptions');
        quantOptions = boxOptions.querySelectorAll('div');
        var type = sessionStorage.getItem('option');
        var nameQuestion = document.querySelector('#nameQuestion').value;
        var descQuestion = document.querySelector('#desc').value;
        var blankQuestion = document.querySelector('#blankText').value;
        var answer = document.querySelector('#answer').value;
        var listOptions = [];
        for (let index = 0; index < quantOptions.length; index++) {
            listOptions.push(quantOptions[index].querySelector('input').value);
        }
        if (blankQuestion == ' ') {
            db.collection('Lifepacks').doc(localStorage.getItem('dataId')).collection('Questions').add({
                nameQuestion: nameQuestion,
                desQuestion: descQuestion,
                listOptions,
                image: url,
                answer: answer,
                type: type
            }).then(() => {
                window.location.href = "lifepack.php";
            });
        } else {
            db.collection('Lifepacks').doc(localStorage.getItem('dataId')).collection('Questions').add({
                nameQuestion: nameQuestion,
                desQuestion: descQuestion,
                blankQuestion: blankQuestion,
                image: url,
                answer: answer,
                type: type
            }).then(() => {
                window.location.href = "lifepack.php";
            });
        }

    });
}


//if input form is type Range Slide
if (btnRangeSlide != null) {
    btnRangeSlide.addEventListener('click', async(e) => {
        e.preventDefault();

        var type = sessionStorage.getItem('option');
        var nameQuestion = document.querySelector('#nameQuestion').value;
        var descQuestion = document.querySelector('#desc').value;
        var valueInitial = document.querySelector('#valueInitial').value;
        var valueFinal = document.querySelector('#valueFinal').value;
        var valueStringInitial = document.querySelector('#valueStringInitial').value;
        var valueStringMedium = document.querySelector('#valueStringMedium').value;
        var valueStringFinal = document.querySelector('#valueStringFinal').value;
        var answer = document.querySelector('#answer').value;

        db.collection('Lifepacks').doc(localStorage.getItem('dataId')).collection('Questions').add({
            nameQuestion: nameQuestion,
            desQuestion: descQuestion,
            valueInitial: valueInitial,
            valueFinal: valueFinal,
            valueStringInitial: valueStringInitial,
            valueStringMedium: valueStringMedium,
            valueStringFinal: valueStringFinal,
            answer: answer,
            type: type
        }).then(() => {
            window.location.href = "lifepack.php";
        });
    });
}


let next = document.querySelector('#lifepack-btn');
if (next != null) {
    next.addEventListener('click', (e) => {
        e.preventDefault();
        var optionType = document.querySelector('#exampleFormControlSelect1');

        sessionStorage.setItem('option', optionType.value);

        if (optionType.value == 'Mcq Questions') {
            window.location.href = "lifepackquestionAdd1.php";
        } else if (optionType.value == 'Image Type Question') {
            window.location.href = "lifepackQuestionImageAdd.php";
        } else if (optionType.value == 'Audio Type Question') {
            window.location.href = "lifepackQuestionAudioAdd.php";
        } else if (optionType.value == 'Range Slider Question') {
            window.location.href = "lifepackQuestionSlideAdd.php";
        } else if (optionType.value == 'Timer Question') {
            window.location.href = "lifepackQuestionTimerAdd.php";
        }

    });
}

//Dynamically Generate Question Components
const ul = document.querySelector('#lifepackQuestionForm1');
//function to create a dopdown