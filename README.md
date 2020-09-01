# network


** 현재는 테스트용도로만 사용 -> 프로젝트 이관


## Test Automation DashBoard Prototype

테스트 자동화를 위한 대쉬보드 및 Node.js 샘플 입니다.

# Package.json

####운영 

npm run deploy : "배포 시 사용하며 FE와 BE를 빌드 하여 NMS 서버를 운영 모드로 전환합니다."  
npm run redeploy : "운영 모드로 배포된 NMS 서버를 재 시작 합니다. "  
npm run undeploy : "운영 모드로 배포도니 NMS 서버를 중단 및 제거 합니다."  
npm run stop : "운영중인 NMS 서버를 중단 합니다. "  
npm run delete : "중단된 NMS 서버를 삭제 합니다. "  
npm run log : "운영중인 NMS 서버의 실시간 로그를 확인 합니다."  

####개발 

npm run dev : "FE와 BE의 소스코드가 변경될 시 재시작하는 개발 환경 모드로 시작합니다."   
npm run be-dev : "BE의 소스코드가 변경될 시 재시작하는 개발 환경 모드로 시작합니다."  
npm run fe-dev : "FE의 소스코드가 변경될 시 재시작하는 개발 환경 모드로 시작합니다."  

####준비 

npm run tsc : "BE코드를 빌드합니다."  
npm run webpack :"FE 코드를 빌드합니다."  
npm run build : "FE코드를 프로덕션형태로 빌드합니다."  
npm run ready :"BE와 FE의 코드를 빌드만 합니다."  


## Build with Technical stack


## Authros
* **Jaeuk.Lee** - *GDL* - [개인블로그](https://ipex.tistory.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you for reading.
