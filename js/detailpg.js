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
            <div class="card-header">
                좀비 소개
            </div>
            <ul class="list-group">
                <li class="list-group-item01">
                    <span class="label">이름</span>
                    <span class="content">${name}</span>
                </li>
                <li class="list-group-item02">
                    <span class="label">MBTI</span>
                    <span class="content">${mbti}</span>
                </li>
                <li class="list-group-item01">
                    <span class="label">이메일</span>
                    <span class="content">${email}</span>
                </li>
                <li class="list-group-item01">
                    <span class="label">소개글</span>
                    <span class="content">${content}</span>
                </li>
                <li class="list-group-item01">
                    <span class="label">블로그 주소</span>
                    <span class="content"><a href="${blog}" target="_blank">${blog}</a></span>
                </li>
                <li class="list-group-item01">
                    <span class="label">특기 or 취미</span>
                    <span class="content">${hobby}</span>
                </li>
                <li class="list-group-item01">
                    <span class="label">좋아요</span>
                    <span id="likeCount" class="content">☆좋아요 연결</span>
                </li>
            </ul>
        `;

        $("#detail_card").append(temp_html);

        let temp_image = `
            <div class="photo">
                <img src="${image}" width="250"></img>
        `
        $("#detailimage").append(temp_image);
    });
}

