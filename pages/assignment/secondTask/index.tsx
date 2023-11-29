import styled from "styled-components";

export default function SecondTask() {
  const after = `
    function removeClass(element, className) {
      element.classList.remove(className);
    }

    function addClass(element, className) {
      element.classList.add(className);
    }

    function setStyles(element, styles) {
      for (const [key, value] of Object.entries(styles)) {
        element.style[key] = value;
      }
    }

    const target1 = document.getElementById("target-1");
    removeClass(target1, "border");

    target1.style.left = "250px";

    const target2 = document.querySelector(".target-2");
    removeClass(target2, "border");
    addClass(target2, "blue");

    setStyles(target2, { left: "50px", marginTop: "-15px" });

    const target3 = document.getElementById("target-3");
    const target4 = document.getElementById("target-4");

    target3.classList.add("fadeOut");
    setTimeout(() => {
      target3.classList.add("hidden");
      addClass(target4, "green");
    }, 1000);
  `;

  const before = `
// 1
$('#target-1').removeClass('border');
// 2
$('#target-1').css('left', '250px');
// 3
$('.target-2').removeClass('border').addClass('blue');
// 4
$('.target-2').css({ 'left': 50, 'margin-top': '-15px' })
// 5
$('#target-3').fadeOut(() => $('#target-4').addClass('green'));
`;

  return (
    <Container>
      <Header>과제2</Header>
      <ComparisonContainer>
        <div>
          <h2>jQuery 라이브러리를 사용</h2>
          <CodeContainer>{before}</CodeContainer>
        </div>
        <div>
          <h2>순수 자바스크립트 코드</h2>
          <CodeContainer>{after}</CodeContainer>
        </div>
      </ComparisonContainer>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;

const Header = styled.h1`
  margin-bottom: 30px;
  margin-top: 20px;
`;

const ComparisonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const CodeContainer = styled.pre`
  text-align: start;
  background-color: #f4f4f4;
  padding: 30px;
  border-radius: 5px;
  overflow-x: auto;
`;
