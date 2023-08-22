# azure-devops-cli

## epic.mjs

#### azure devops의 epic child tree를 조회합니다.

1. azure access token 발급

   - User settings > Security > Personal access tokens

2. 프로젝트 경로 확인

   - ex) https://dev.azure.com/{organization}/{project}/_apis

3. 터미널에서 node 컴파일 → 인자로 조회를 시작할 epic의 id를 입력
   - `node epic.mjs 8993`
