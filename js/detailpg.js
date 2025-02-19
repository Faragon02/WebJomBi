
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// Firebase 구성 정보 설정

const firebaseConfig = {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Firestore에서 데이터 가져오기
async function loadData() {
    let docs = await getDocs(collection(db, "webjombi"));
    docs.forEach((doc) => {
        let row = doc.data();
        let image = row.image;
        let name = row.name;
        let content = row.content;

        let temp_html = `
                <div class="card">
                <div class="card-header">
                    좀비 소개
                </div>
                <ul class="list-group">
                    <li class="list-group-item01">
                        <span class="label">이름</span>
                    </li>
                    <li class="list-group-item01">
                        <span class="label">성별</span>
                    </li>
                    <li class="list-group-item02">
                        <span class="label">MBTI</span>
                    </li>
                    <li class="list-group-item01">
                        <span class="label">이메일</span>
                    </li>
                    <li class="list-group-item01">
                        <span class="label">블로그 주소</span>
                    </li>
                    <li class="list-group-item01">
                        <span class="label">특기 or 취미</span>
                    </li>
                </ul>
            </div>`;
        $('#card').append(temp_html);
    });
}

window.redirectToDetail = function (name) {
    window.location.href = `detailpg.html?name=${name}`;
};


loadData();