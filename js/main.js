
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
// 문서가 로드된 후 실행되도록 설정
$(document).ready(function () {
    $("#postingbtn").click(async function () {
        let input_image = $('#image').val();
        let input_name = $('#name').val();
        let input_gender = $('#gender').val();
        let input_mbti = $('#mbti').val();
        let input_email = $('#email').val();
        let input_blog = $('#blog').val();
        let input_hobby = $('#hobby').val();
        let input_content = $('#content').val();

        if (!input_image || !input_name || !input_gender || !input_mbti || !input_email
            || !input_blog || !input_hobby || !input_content) {
            alert("모든 필드를 입력해주세요!");
            return;
        }

        let doc = {
            image: input_image,
            name: input_name,
            gender: input_gender,
            mbti: input_mbti,
            email: input_email,
            blog: input_blog,
            hobby: input_hobby,
            content: input_content,
        };

        await addDoc(collection(db, "webjombi"), doc);
        alert('저장 완료!');
        window.location.reload();
    });


    // Firestore에서 데이터 가져오기
    async function loadData() {
        let docs = await getDocs(collection(db, "webjombi"));
        docs.forEach((doc) => {
            let row = doc.data();
            let image = row.image;
            let name = row.name;
            let content = row.content;

            let temp_html = `
                 <div class="col">
                 <div class="card h-100">
                   <img src="${image}" class="card-img-top" alt="프로필 이미지">
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <p class="card-text">${content}</p>
                       </div>
                        <div class="button-container">  
                            <div class="zombie">
                        </div>
                        <button type="button" class="btn btn-secondary" onclick="redirectToDetail('${name}')">자세히 보기</button>
                </div>
            </div>
        </div>`;
            $('#card').append(temp_html);
        });
    }

    window.redirectToDetail = function (name) {
        localStorage.setItem('selectedName', name);
        // 상세 페이지로 리디렉션
        window.location.href = 'detailpg.html';
    };


    loadData();
});