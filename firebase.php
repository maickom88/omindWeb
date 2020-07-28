<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-firestore.js"></script>

<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-storage.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-analytics.js"></script>

<script>
	// Your web app's Firebase configuration
	var firebaseConfig = {
		apiKey: "AIzaSyC9Y7bX4oYlyuyg7v8OMU3SVikLWM_UP48",
		authDomain: "omnid-bd5df.firebaseapp.com",
		databaseURL: "https://omnid-bd5df.firebaseio.com",
		projectId: "omnid-bd5df",
		storageBucket: "omnid-bd5df.appspot.com",
		messagingSenderId: "779489293828",
		appId: "1:779489293828:web:712e18506c5498cebd2751",
		measurementId: "G-4CK1KGEYT2"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	const auth = firebase.auth();
	const db = firebase.firestore();
	var select = document.querySelector('#selectUser');
	db.collection("Users").get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				var op = new Option(doc.data().email, doc.data().email)
				console.log(doc.id, " => ", doc.data().email);
				select.append(op);
			});
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
</script>