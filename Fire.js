import firebase from 'firebase';
import '@firebase/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyCEJLoYF_vMrlO_PQAr--RKQUhLw9IM2e4",
    authDomain: "myapp-1026d.firebaseapp.com",
    databaseURL: 'https://console.firebase.google.com/project/myapp-1026d/settings/general/web:YzcxYzBhYWItNDBiOS00ZjhlLTk0MDEtMjFhYTk3ZjliNjg1',
    projectId: "myapp-1026d",
    storageBucket: "myapp-1026d.firebasestorage.app",
    messagingSenderId: "134203440915",
    appId: "1:134203440915:web:d838cdce764c416bdea4e6"
}

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback(null, user)
      } else {
        firebase.auth().signInAnonymously().catch(error => {
          callback(error);
        });
      }
    })
  }

  getLists(callback) {
    let ref = this.ref.orderBy('name');

    this.unsubscribe = ref.onSnapshot(snapshot => {
      lists = [];

      snapshot.forEach(doc => {
        lists.push({
          id: doc.id,
          ...doc.data()
        })
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;
    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;
    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('lists');
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;