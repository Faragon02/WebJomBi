import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
    apiKey: "AIzaSyC54ag5p7OFYT8vaMqHWjI1BGKldR1zP84",
    authDomain: "sparta-42d48.firebaseapp.com",
    projectId: "sparta-42d48",
    storageBucket: "sparta-42d48.firebasestorage.app",
    messagingSenderId: "944449923606",
    appId: "1:944449923606:web:38cc8a9b00df542fc22337",
    measurementId: "G-QRKPJ3RFC9"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$(document).ready(function () {
    // localStorage에서 'selectedName' 값 가져오기
    const name = localStorage.getItem('selectedName');
    
    if (!name) {
        $("#detail_card").html("<p>잘못된 접근입니다.</p>");
        return;
    }

    // Firestore에서 name 값에 해당하는 데이터만 가져오기
    loadData(name);
});

// Firestore에서 데이터 가져오기
// Firestore에서 name 값에 해당하는 데이터만 가져오기
async function loadData(name) {
    const q = query(collection(db, "webjombi"), where("name", "==", name));
    const docs = await getDocs(q);

    if (docs.empty) {
        $("#detail_card").html("<p>해당하는 데이터가 없습니다.</p>");
        return;
    }

    docs.forEach((doc) => {
        let row = doc.data();
        let image = row.image;
        let gender = row.gender;
        let mbti = row.mbti;
        let email = row.email;
        let blog = row.blog;
        let hobby = row.hobby;
        let content = row.content;

        let temp_html = `
            <div class="card">
                <img src="${image}" class="card-img-top" alt="프로필 이미지">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text"><strong>성별:</strong> ${gender}</p>
                    <p class="card-text"><strong>MBTI:</strong> ${mbti}</p>
                    <p class="card-text"><strong>이메일:</strong> ${email}</p>
                    <p class="card-text"><strong>블로그:</strong> <a href="${blog}" target="_blank">${blog}</a></p>
                    <p class="card-text"><strong>취미:</strong> ${hobby}</p>
                    <p class="card-text"><strong>소개:</strong> ${content}</p>
                </div>
            </div>`;
        $("#detail_card").append(temp_html);
    });
}
