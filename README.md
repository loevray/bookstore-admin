# Bookstore-admin

build a bookstore for admin.

# Key Features
핵심 요구사항을 구현한 내용에 대해 설명합니다.

# Backend

### RESTful API
- 백엔드를 구축해본 경험이 없어, `Next.js >= 14` 기능인 `route handler`를 이용하여 RESTful API를 설계하였습니다.
[링크](https://github.com/loevray/bookstore-admin/tree/docs/readme/src/app/api/books)
- `route handler` 사용소감: Next에서 백엔드 작업시 기존의 엔드포인트를 이용한 RESTful API를 사용하지 않고 서버 컴포넌트나 route handler에서 직접 호출하면 편할 것 같습니다.
  보안또한 서버에서 실행되는 만큼 보장된다고 생각합니다.

### DB
- db는 간단하게 google firestore을 사용하였습니다. [링크](https://github.com/loevray/bookstore-admin/blob/docs/readme/src/app/firebase/firebasedb.ts)
  - db와 app의 데이터모델을 컨버팅해주는 `withConverter()`메서드를 사용하였습니다. [링크](https://github.com/loevray/bookstore-admin/blob/docs/readme/src/app/firebase/booksConverter.ts)
- 배칭, 트랜잭션은 사용하지 못했습니다.
- [firestore에서 규칙](https://firebase.google.com/docs/firestore/security/rules-conditions?hl=ko)을 제공해주는데, 시간이 부족하여 validation을 적용하지 않았습니다.

### Exception, Error
- 예외처리는 단순하게 하였습니다. [firestore에서 에러코드를 따로 제공](https://firebase.google.com/docs/reference/node/firebase.firestore?_gl=1*1t317xv*_up*MQ..*_ga*MTU0ODA0NzU3Ny4xNzMzOTE2ODY4*_ga_CW55HF8NVT*MTczMzkxNjg2OC4xLjAuMTczMzkxNjg2OC4wLjAuMA..#firestoreerrorcode)해주는데, 시간이 부족하여 구분하지는 못했습니다. 대신 `instanceof`를 활용하여 에러코드를 클라이언트에게 넘겨주었습니다.

### Etc...
- api 반환타입이 자주사용되어 `type.ts`파일로 분리하였습니다.[링크](https://github.com/loevray/bookstore-admin/blob/docs/readme/src/app/api/books/type.ts)

# FrontEnd

## Book List Page

[기본적으로 홈에 들어가면 보이는 페이지입니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/page.tsx#L6)
<br/>
![image](https://github.com/user-attachments/assets/719ee984-c788-4471-a1cc-ec668289c63e)

- tailwind를 사용해서 스타일링 하였습니다. Next.js에서 추천하기도하고, SSR시 CSS-in-JS를 사용하면 hyrate이전 서버에서 받아오는 기본 html에 스타일이 없이 넘어와서 tailwind를 적용하였습니다.
- 서버 컴포넌트의 prefetch 기능과 react-query의 선언적 프로그래밍, type-safe등의 기능을 사용하기위해 서버컴포넌트에서 prefetch를 진행하여 [hydrate 후 dehydrate하여 클라이언트에게 넘겨주는 패턴](https://github.com/loevray/bookstore-admin/blob/docs/readme/src/app/_components/book/BookListWrapper.tsx)을 적용하였습니다.
- 현재 책 목록을 쿼리할 시, 목록 페이지에서 사용되지 않는 상세정보들도 넘어옵니다. db구조 개편이 필요할 것 같습니다.
- 책 이미지는 따로 처리하지 않고, 랜덤이미지를 제공해주는 사이트를 이용하였습니다.
  - 이미지에 대한 최적화를 진행하지 못하고 단순히 Next에서 제공해주는 `<Image/>`태그를 사용하였습니다.


### pagination

[책 목록 페이지 하단에 페이지네이션을 적용하였습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/BookList.tsx#L52)
<br/>
![image](https://github.com/user-attachments/assets/5fdf1333-f7a5-4607-ad9a-0f24ddb1bfaa)

- 요구사항대로 10개씩 firestore에서 쿼리했습니다. 해당 작업은 [RESTful API중 GET](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/api/books/route.ts#L20)에서 진행하였습니다.
  - 해당 기능에서 현재 쿼리 가능한 마지막 문서를 알려주는 [헬퍼함수](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/api/books/route.ts#L83)를 제작하였습니다.
- 제목, 저자 필터링 검색시에도 페이지네이션이 적용되게끔 했습니다.
- 도서의 수가 훨씬 많을때의 처리는 하지 못하였습니다.
- react-query의 캐싱기능을 적용하였습니다. [쿼리키는 다음과 같습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/BookList.tsx#L18)

### filtered by author, title

[책 목록 페이지 상단에 필터 검색 기능을 추가하였습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/BookSearchForm.tsx#L23)
<br/>
![image](https://github.com/user-attachments/assets/d9dc95ac-2dc9-4d66-a987-2846712600ad)

- [마찬가지로 검색 내용을 쿼리키로 캐싱하였습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/BookList.tsx#L18)
- `zod, react-hook-form` 라이브러리를 이용하여 [간단하게나마 validation을 진행하였습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/BookSearchForm.tsx#L8)
  - 필수입력, 길이, 공백처리입니다. 
  - 서버측에서도 같이 validation을 진행하면 좋을 것 같습니다.

## Book Detail Page

[책의 상세정보 페이지입니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/%5Bid%5D/page.tsx#L5)
<br/>
![image](https://github.com/user-attachments/assets/42f9833f-7ae4-4907-ba77-dabafa486437)

- [책 목록 페이지에서 캐싱된 데이터를 이용해보았습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/%5Bid%5D/BookDetail.tsx#L18) 만약 존재하지 않는다면 `useSuspenseQuery()`에서 쿼리를 진행하도록 하였습니다.
  - 책 목록 페이지처럼 서버 컴포넌트에서 prefetching을 이용해보려 했으나, 불가능하였고, 책 목록페이지에서 캐시된 내용이 존재해서 클라이언트측에서 캐시검증을 하고 사용하였습니다.

### Qunatity control

[각 버튼을 이용하여 책의 수량을 조절할 수 있습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/%5Bid%5D/BookDetail.tsx#L79)
<br/>
![image](https://github.com/user-attachments/assets/3dfa49ef-3afe-419c-a999-1e6ee6a4ebf4)

- 해당 기능은 아쉬운점이 많습니다.
 - 숫자로 업데이트 하기, 낙관적 업데이트, 짧은 API요청주기 방지(디바운싱) 등. 적용하지 못한 최적화가 많습니다.
- 수량 업데이트 후 현재 책 상세정보의 캐시를 초기화 시켜 ui에 표시된 숫자를 바로 업데이트합니다. [링크](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/%5Bid%5D/BookDetail.tsx#L27)

### Create Book

책 추가는 홈 화면 우측하단 [버튼](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/FloatingButton.tsx#L6)을 클릭하면 [입력폼](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/AddBookForm.tsx#L58)이 나옵니다.
<br/>
![image](https://github.com/user-attachments/assets/e0688151-5d06-4b3a-a986-e34df9fa4764)

- 현재 모달과 폼이 합쳐져있는데, Modal기능을 하는 컴포넌트를 따로 분리하면 좋을 것 같습니다.
  - 모달 상태를 관리하는 커스텀훅을 만들어서 사용하면 좋을 것 같습니다.
  - 모달 상태를 컴포넌트 외부, 내부 어디서 관리할지는 고민해봐야 할것 같습니다.
  - 외부: 외부에서 상태를 주입하여 관리할 수 있어 의존성이 줄어듭니다.
  - 내부: 내부에서 상태를 관리하여 간단하게 사용할 수 있습니다. 외부 컴포넌트를 클라이언트 컴포넌트로 만들지 않아도 됩니다.(`useState사용x`)
- 폼은 `zod + react-hook-form`조합으로 [간단한 validation을 진행하였습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/AddBookForm.tsx#L11)
  - 검색폼처럼 서버측에서도 validation을 진행하면 좋을 것 같습니다.
- 문서 생성시, [캐시를 초기화하고 홈으로 보냅니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/AddBookForm.tsx#L75)
- `react-hook-form`으로 인풋 제작시 반복되는 작업이 많아 [매핑패턴을 이용하였습니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/_components/book/AddBookForm.tsx#L94)

### Delete Book

문서 삭제는 책 상세페이지 하단 [버튼]((https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/%5Bid%5D/BookDetail.tsx#L92))입니다.
<br/>
![image](https://github.com/user-attachments/assets/4f1a2f73-6a9d-4e6b-a1b1-330b9be34c00)

- 현재 확인절차를 거치지 않고 삭제를 진행합니다. 한 번 더 확인할 수 있는 창을 도입하면 괜찮을 것 같습니다.
- 현재 별다른 인증 없이 책의 추가,수정,삭제가 가능합니다. 로그인처럼 특정한 인증을 받은 유저만 할 수 있으면 좋을 것 같습니다.
- 문서의 id를 받아 삭제합니다. [삭제후 홈으로 이동하고 현재 책 캐시를 제거합니다.](https://github.com/loevray/bookstore-admin/blob/eb8191a4e60b19e88e76f21e6669487005dc2b7f/src/app/%5Bid%5D/BookDetail.tsx#L38)

# Code architecture, Optimize

### ErrorBoundary, Suspense

`ErrorBoundary`와 `Suspense`를 한번에 사용하는 [ApiQueryWrapper컴포넌트](https://github.com/loevray/bookstore-admin/blob/3855dac12e1f650db59d83d4199dc8a580ad4f53/src/app/_components/book/ApiQueryWrapper.tsx#L7)를 만들어 사용했습니다.

- API호출시 `useQuery`를 사용하게되면 컴포넌트 내에서 `에러, 로딩`처리를 해야합니다. 이 처리를 바깥으로 빼내 선언적으로 처리하기위하여 해당 컴포넌트와 `useSuspenseQuery`를 같이 사용하였습니다.
  - `useSuspenseQuery`는 반환 데이터가 not nullish여서 타입스크립트를 사용할때도 편리해서 사용했습니다.
- 현재는 하드코딩 된 fallback들을 사용하고 있으나, props로 받아와서 넘겨주면 좋을 것 같습니다.
  - 에러쪽 fallback에는 `reset, error`를 넣어주고있어, 각 에러에 맞는 처리 후 에러 리셋기능이 필요하다면 추가하면 될 듯 합니다.
  - 예외처리를 단순히 구현만 해두었습니다.



### 아쉬운점들...

- 서버측 API테스트, 프론트측 storybook과 jest를 이용한 렌더 테스트, 유틸함수 유닛 테스트
- 메타태그를 이용한 SEO
- 번들링 최적화
- lighthouse를 이용한 사이트 최적화
- 변수명, 매직넘버의 상수화
- 겹치는 기능 함수로 분리
- 도메인 로직과 ui로직의 분리

# ETC

- 커밋은 최대한 간단명료하게 작성하였습니다. 
- 이슈와 풀리퀘스트는 하나의 템플릿만을 이용해 작성하였습니다.
- 간단한 빌드와 테스트를 위한 CI를 도입했습니다. (테스트는 구현이 늦어져 삭제하였습니다...)

---

# Tech Stack

### used
- `Next.js` : 백엔드 코드까지 한번에 작성하기 위해 사용하였습니다
- `React-Query` : Next의 `fetch`만으로도 데이터 페칭은 가능하나, 선언적 프로그래밍(`useSuspense`)과 클라이언트측 캐시를 위해 도입하였습니다.
- `firebase`: 데이터베이스를 대신하기 위한 클라우드 db입니다.
- `react-hook-form` : 비제어 컴포넌트의 장점을 살리고, form validation작성시 보일러플레이트를 간소화 하기위해 사용하였습니다.
- `zod` : 위 라이브러리의 타입 검사를 하기 위하여 사용하였습니다.

### not used

- `Zustand` : 클라이언트측 상태관리를 위해 설치하였으나, 페이지구현에 필요한 클라이언트 상태가 거의 없어서 사용하지 않았습니다.
- `Jest` : 서버측과 클라이언트측 테스트를 위해 설치하였으나, 시간부족과 미숙함으로 인하여 사용하지 않았습니다.
- `Storybook` : 클라이언트측 컴포넌트 테스트를 위해 설치하였으나, 위와 동일한 이유로 사용하지 않았습니다.
- `@testing-library/react` : 클라이언트측 컴포넌트 테스트를 위해 설치하였으나, 위와 동일한 이유로 사용하지 않았습니다.

---

# How to install

---

# License
