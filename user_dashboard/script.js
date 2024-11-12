i18next.init({
    lng: 'ko', // 초기 언어
    resources: {
        ko: {
            translation: {
                title: "웹 퍼징 대시보드",
                targetPlaceholder: "TARGET URL or IP",
                startButton: "공격 시작",
                copyMessage: "옵션 복사 완료",
                startAlert: "{{target}}으로 퍼징이 시작되었습니다!",
                targetMissing: "타겟 URL 또는 IP를 입력하세요.",
                options: {
                    target: [
                        /* { label: "-u, -target [스캔할 대상 URL/호스트]", value: "-u" }, */
                        { label: "-l, -list [스캔할 대상 URL/호스트 목록이 있는 파일 경로 (한 줄에 하나씩)]", value: "-l" },
                        { label: "-resume [resume.cfg를 사용하여 스캔 재개 (클러스터링은 비활성화됨)]", value: "-resume" },
                        { label: "-sa, -scan-all-ips [dns 레코드와 관련된 모든 IP 스캔]", value: "-sa" },
                        { label: "-iv, -ip-version [스캔할 호스트의 IP 버전 (4,6) - (기본값 4)]", value: "-iv" },
                    ],
                    /* templates: [
                        { label: "-nt, -new-templates [최신 nuclei-templates 릴리스에 추가된 새 템플릿만 실행]", value: "-nt" },
                        { label: "-ntv, -new-templates-version [특정 버전에 추가된 새 템플릿 실행]", value: "-ntv" },
                        { label: "-as, -automatic-scan [wappalyzer 기술 감지를 사용하여 태그 매핑으로 자동 웹 스캔]", value: "-as" },
                        { label: "-t, -templates [실행할 템플릿 또는 템플릿 디렉토리 목록 (쉼표로 구분, 파일)]", value: "-t" },
                        { label: "-turl, -template-url [실행할 템플릿 url 또는 템플릿 url 목록 (쉼표로 구분, 파일)]", value: "-turl" },
                        { label: "-w, -workflows [실행할 워크플로우 또는 워크플로우 디렉토리 목록 (쉼표로 구분, 파일)]", value: "-w" },
                        { label: "-wurl, -workflow-url [실행할 워크플로우 url 또는 워크플로우 url 목록 (쉼표로 구분, 파일)]", value: "-wurl" },
                        { label: "-validate [nuclei에 전달된 템플릿 검증]", value: "-validate" },
                        { label: "-nss, -no-strict-syntax [템플릿에서 엄격한 구문 검사 비활성화]", value: "-nss" },
                        { label: "-td, -template-display [템플릿 내용 표시]", value: "-td" },
                        { label: "-tl [사용 가능한 모든 템플릿 목록]", value: "-tl" },
                        { label: "-sign [NUCLEI_SIGNATURE_PRIVATE_KEY 환경 변수에서 정의된 개인 키로 템플릿에 서명]", value: "-sign" },
                        { label: "-code [코드 프로토콜 기반 템플릿 로딩 활성화]", value: "-code" },
                    ], */
                    filtering: [
                        { label: "-a, -author [저자를 기반으로 실행할 템플릿 (쉼표로 구분, 파일)]", value: "-a" },
                        { label: "-tags [태그를 기반으로 실행할 템플릿 (쉼표로 구분, 파일)]", value: "-tags" },
                        { label: "-etags, -exclude-tags [태그를 기반으로 제외할 템플릿 (쉼표로 구분, 파일)]", value: "-etags" },
                        { label: "-itags, -include-tags [기본값 또는 구성에 의해 제외되더라도 실행되어야 하는 태그]", value: "-itags" },
                        { label: "-id, -template-id [템플릿 id를 기반으로 실행할 템플릿 (쉼표로 구분, 파일, 와일드카드 허용)]", value: "-id" },
                        { label: "-eid, -exclude-id [템플릿 id를 기반으로 제외할 템플릿 (쉼표로 구분, 파일)]", value: "-eid" },
                        { label: "-it, -include-templates [기본값 또는 구성에 의해 제외되더라도 실행되어야 하는 템플릿]", value: "-it" },
                        { label: "-et, -exclude-templates [제외할 템플릿 또는 템플릿 디렉토리 (쉼표로 구분, 파일)]", value: "-et" },
                        { label: "-em, -exclude-matchers [결과에서 제외할 템플릿 매처]", value: "-em" },
                        { label: "-s, -severity [심각도를 기반으로 실행할 템플릿. 가능한 값: info, low, medium, high, critical, unknown]", value: "-s" },
                        { label: "-es, -exclude-severity [심각도를 기반으로 제외할 템플릿. 가능한 값: info, low, medium, high, critical, unknown]", value: "-es" },
                        { label: "-pt, -type [프로토콜 유형을 기반으로 실행할 템플릿. 가능한 값: dns, file, http, headless, tcp, workflow, ssl, websocket, whois, code, javascript]", value: "-pt" },
                        { label: "-ept, -exclude-type [프로토콜 유형을 기반으로 제외할 템플릿. 가능한 값: dns, file, http, headless, tcp, workflow, ssl, websocket, whois, code, javascript]", value: "-ept" },
                        { label: "-tc, -template-condition [표현식 조건을 기반으로 실행할 템플릿]", value: "-tc" },
                    ],
                    /* output: [
                        { label: "-o, -output [발견된 문제/취약점을 작성할 출력 파일]", value: "-o" },
                        { label: "-sresp, -store-resp [모든 요청/응답을 nuclei를 통해 출력 디렉토리에 저장]", value: "-sresp" },
                        { label: "-srd, -store-resp-dir [모든 요청/응답을 nuclei를 통해 사용자 정의 디렉토리에 저장 (기본값 'output')]", value: "-srd" },
                        { label: "-silent [결과만 표시]", value: "-silent" },
                        { label: "-nc, -no-color [출력 내용 색상 비활성화 (ANSI 이스케이프 코드)]", value: "-nc" },
                        { label: "-j, -jsonl [JSONL 형식으로 출력 작성]", value: "-j" },
                        { label: "-irr, -include-rr [JSON, JSONL, Markdown 출력에 요청/응답 쌍 포함 (결과만 해당)]", value: "-irr" },
                        { label: "-or, -omit-raw [JSON, JSONL, Markdown 출력에서 요청/응답 쌍 생략 (결과만 해당)]", value: "-or" },
                        { label: "-ot, -omit-template [JSON, JSONL 출력에서 인코딩된 템플릿 생략]", value: "-ot" },
                        { label: "-nm, -no-meta [CLI 출력에서 결과 메타데이터 인쇄 비활성화]", value: "-nm" },
                        { label: "-ts, -timestamp [CLI 출력에 타임스탬프 인쇄 활성화]", value: "-ts" },
                        { label: "-rdb, -report-db [nuclei 보고 데이터베이스 (보고 데이터를 유지하려면 항상 이것을 사용)]", value: "-rdb" },
                        { label: "-ms, -matcher-status [매치 실패 상태 표시]", value: "-ms" },
                        { label: "-me, -markdown-export [Markdown 형식으로 결과를 내보낼 디렉토리]", value: "-me" },
                        { label: "-se, -sarif-export [SARIF 형식으로 결과를 내보낼 파일]", value: "-se" },
                        { label: "-je, -json-export [JSON 형식으로 결과를 내보낼 파일]", value: "-je" },
                        { label: "-jle, -jsonl-export [JSONL 형식으로 결과를 내보낼 파일]", value: "-jle" },
                    ], */
                    configurations: [
                        { label: "-config [nuclei 구성 파일 경로]", value: "-config" },
                        { label: "-fr, -follow-redirects [http 템플릿에 대한 리디렉션 따라가기 활성화]", value: "-fr" },
                        { label: "-fhr, -follow-host-redirects [같은 호스트에서 리디렉션 따라가기]", value: "-fhr" },
                        { label: "-mr, -max-redirects [http 템플릿에 대해 따라갈 최대 리디렉션 수 (기본값 10)]", value: "-mr" },
                        { label: "-dr, -disable-redirects [http 템플릿에 대한 리디렉션 비활성화]", value: "-dr" },
                        { label: "-rc, -report-config [nuclei 보고 모듈 구성 파일]", value: "-rc" },
                        { label: "-H, -header [모든 http 요청에 포함할 사용자 정의 헤더/쿠키 (header:value 형식)]", value: "-H" },
                        { label: "-V, -var [key=value 형식의 사용자 정의 변수]", value: "-V" },
                        { label: "-r, -resolvers [nuclei에 대한 리졸버 목록이 있는 파일]", value: "-r" },
                        { label: "-sr, -system-resolvers [오류 대체로 시스템 DNS 해결 사용]", value: "-sr" },
                        { label: "-dc, -disable-clustering [요청 클러스터링 비활성화]", value: "-dc" },
                        { label: "-passive [수동 HTTP 응답 처리 모드 활성화]", value: "-passive" },
                        { label: "-fh2, -force-http2 [요청에 http2 연결 강제]", value: "-fh2" },
                        { label: "-ev, -env-vars [템플릿에서 환경 변수 사용 활성화]", value: "-ev" },
                        { label: "-cc, -client-cert [스캔 대상 호스트에 대한 인증에 사용되는 클라이언트 인증서 파일 (PEM 인코딩)]", value: "-cc" },
                        { label: "-ck, -client-key [스캔 대상 호스트에 대한 인증에 사용되는 클라이언트 키 파일 (PEM 인코딩)]", value: "-ck" },
                        { label: "-ca, -client-ca [스캔 대상 호스트에 대한 인증에 사용되는 클라이언트 인증서 기관 파일 (PEM 인코딩)]", value: "-ca" },
                        { label: "-sml, -show-match-line [파일 템플릿에 대한 매치 라인 표시]", value: "-sml" },
                        { label: "-ztls [ztls 라이브러리 사용]", value: "-ztls" },
                        { label: "-sni [사용할 tls sni 호스트 이름 (기본값: 입력 도메인 이름)]", value: "-sni" },
                        { label: "-lfa, -allow-local-file-access [시스템 어디서나 파일 액세스 허용]", value: "-lfa" },
                        { label: "-lna, -restrict-local-network-access [로컬/개인 네트워크로의 연결 차단]", value: "-lna" },
                        { label: "-i, -interface [네트워크 스캔에 사용할 네트워크 인터페이스]", value: "-i" },
                        { label: "-at, -attack-type [수행할 페이로드 조합 유형]", value: "-at" },
                        { label: "-sip, -source-ip [네트워크 스캔에 사용할 소스 IP 주소]", value: "-sip" },
                        { label: "-rsr, -response-size-read [바이트 단위로 읽을 최대 응답 크기 (기본값 10485760)]", value: "-rsr" },
                        { label: "-rss, -response-size-save [바이트 단위로 읽을 최대 응답 크기 (기본값 1048576)]", value: "-rss" },
                        { label: "-reset [모든 nuclei 구성 및 데이터 파일을 제거합니다]", value: "-reset" },
                        { label: "-tlsi, -tls-impersonate [실험적인 클라이언트 hello tls 무작위화 활성화]", value: "-tlsi" },
                    ],
                    interactsh: [
                        { label: "-iserver, -interactsh-server [자체 호스팅 인스턴스를 위한 interactsh 서버 url]", value: "-iserver" },
                        { label: "-itoken, -interactsh-token [자체 호스팅 interactsh 서버를 위한 인증 토큰]", value: "-itoken" },
                        { label: "-interactions-cache-size [상호 작용 캐시에 유지할 요청 수]", value: "-interactions-cache-size" },
                        { label: "-interactions-eviction [캐시에서 요청을 제거하기 전에 기다릴 초 수]", value: "-interactions-eviction" },
                        { label: "-interactions-poll-duration [각 상호 작용 폴 요청 사이에 기다릴 초 수]", value: "-interactions-poll-duration" },
                        { label: "-interactions-cooldown-period [종료 전에 상호 작용 폴링에 추가 시간]", value: "-interactions-cooldown-period" },
                        { label: "-ni, -no-interactsh [OAST 테스트를 위한 interactsh 서버 비활성화]", value: "-ni" },
                    ],
                    fuzzing: [
                        { label: "-ft, -fuzzing-type [템플릿에 설정된 퍼징 유형 재정의]", value: "-ft" },
                        { label: "-fm, -fuzzing-mode [템플릿에 설정된 퍼징 모드 재정의]", value: "-fm" },
                    ],
                    uncover: [
                        { label: "-uc, -uncover [uncover 엔진 활성화]", value: "-uc" },
                        { label: "-uq, -uncover-query [uncover 검색 쿼리]", value: "-uq" },
                        { label: "-ue, -uncover-engine [uncover 검색 엔진]", value: "-ue" },
                        { label: "-uf, -uncover-field [반환할 uncover 필드]", value: "-uf" },
                        { label: "-ul, -uncover-limit [반환할 uncover 결과]", value: "-ul" },
                        { label: "-ur, -uncover-ratelimit [알려지지 않은 ratelimit의 엔진을 재정의하는 ratelimit]", value: "-ur" },
                    ],
                    rate_limit: [
                        { label: "-rl, -rate-limit [초당 보낼 최대 요청 수]", value: "-rl" },
                        { label: "-rlm, -rate-limit-minute [분당 보낼 최대 요청 수]", value: "-rlm" },
                        { label: "-bs, -bulk-size [템플릿당 병렬로 분석할 최대 호스트 수]", value: "-bs" },
                        { label: "-c, -concurrency [병렬로 실행할 최대 템플릿 수]", value: "-c" },
                        { label: "-hbs, -headless-bulk-size [템플릿당 병렬로 분석할 최대 headless 호스트 수]", value: "-hbs" },
                        { label: "-headc, -headless-concurrency [병렬로 실행할 최대 headless 템플릿 수]", value: "-headc" },
                    ],
                    optimizations: [
                        { label: "-timeout [타임아웃 전에 기다릴 초 수]", value: "-timeout" },
                        { label: "-retries [실패한 요청을 재시도하는 횟수]", value: "-retries" },
                        { label: "-ldp, -leave-default-ports [기본 HTTP/HTTPS 포트 남겨두기]", value: "-ldp" },
                        { label: "-mhe, -max-host-error [스캔에서 건너뛰기 전에 호스트에서 허용되는 최대 오류 수]", value: "-mhe" },
                        { label: "-te, -track-error [최대 호스트 오류 감시 목록에 주어진 오류 추가]", value: "-te" },
                        { label: "-nmhe, -no-mhe [오류를 기반으로 스캔에서 호스트 건너뛰기 비활성화]", value: "-nmhe" },
                        { label: "-project [동일한 요청을 여러 번 보내는 것을 피하기 위해 프로젝트 폴더 사용]", value: "-project" },
                        { label: "-project-path [특정 프로젝트 경로 설정]", value: "-project-path" },
                        { label: "-spm, -stop-at-first-match [첫 번째 매치 후 HTTP 요청 처리 중지]", value: "-spm" },
                        { label: "-stream [스트림 모드 - 입력 정렬 없이 시작]", value: "-stream" },
                        { label: "-ss, -scan-strategy [스캔하는 동안 사용할 전략]", value: "-ss" },
                        { label: "-irt, -input-read-timeout [입력 읽기 시간 초과]", value: "-irt" },
                        { label: "-nh, -no-httpx [비 URL 입력에 대한 httpx 프로브 비활성화]", value: "-nh" },
                        { label: "-no-stdin [stdin 처리를 비활성화]", value: "-no-stdin" },
                    ],
                    /* headless: [
                        { label: "-headless [headless 브라우저 지원이 필요한 템플릿 활성화]", value: "-headless" },
                        { label: "-page-timeout [headless 모드에서 각 페이지를 기다리는 시간]", value: "-page-timeout" },
                        { label: "-sb, -show-browser [headless 모드로 실행하는 템플릿에서 브라우저 화면 표시]", value: "-sb" },
                        { label: "-ho, -headless-options [추가 옵션으로 headless chrome 시작]", value: "-ho" },
                        { label: "-sc, -system-chrome [nuclei가 설치한 Chrome 대신 로컬에 설치된 Chrome 브라우저 사용]", value: "-sc" },
                        { label: "-lha, -list-headless-action [사용 가능한 headless 액션 목록 표시]", value: "-lha" },
                    ], */
                    /* debug: [
                        { label: "-debug [모든 요청과 응답 표시]", value: "-debug" },
                        { label: "-dreq, -debug-req [보낸 모든 요청 표시]", value: "-dreq" },
                        { label: "-dresp, -debug-resp [받은 모든 응답 표시]", value: "-dresp" },
                        { label: "-p, -proxy [사용할 http/socks5 프록시 목록]", value: "-p" },
                        { label: "-pi, -proxy-internal [모든 내부 요청을 프록시를 통해 전송]", value: "-pi" },
                        { label: "-ldf, -list-dsl-function [지원되는 모든 DSL 함수 시그니처 목록 표시]", value: "-ldf" },
                        { label: "-tlog, -trace-log [보낸 요청 추적 로그를 기록할 파일]", value: "-tlog" },
                        { label: "-elog, -error-log [보낸 요청 오류 로그를 기록할 파일]", value: "-elog" },
                        { label: "-version [nuclei 버전 표시]", value: "-version" },
                        { label: "-hm, -hang-monitor [nuclei 멈춤 모니터링 활성화]", value: "-hm" },
                        { label: "-v, -verbose [자세한 출력 표시]", value: "-v" },
                        { label: "-profile-mem [선택적인 nuclei 메모리 프로필 덤프 파일]", value: "-profile-mem" },
                        { label: "-vv [스캔에 로드된 템플릿 표시]", value: "-vv" },
                        { label: "-svd, -show-var-dump [디버깅을 위한 변수 덤프 표시]", value: "-svd" },
                        { label: "-ep, -enable-pprof [pprof 디버깅 서버 활성화]", value: "-ep" },
                        { label: "-tv, -templates-version [설치된 nuclei-templates의 버전 표시]", value: "-tv" },
                        { label: "-hc, -health-check [진단 검사 실행]", value: "-hc" },
                    ], */
                    /* update: [
                        { label: "-up, -update [최신 릴리스 버전으로 nuclei 엔진 업데이트]", value: "-up" },
                        { label: "-ut, -update-templates [최신 릴리스 버전으로 nuclei-templates 업데이트]", value: "-ut" },
                        { label: "-ud, -update-template-dir [nuclei-templates를 설치/업데이트할 사용자 지정 디렉토리]", value: "-ud" },
                        { label: "-duc, -disable-update-check [자동 nuclei/templates 업데이트 확인 비활성화]", value: "-duc" },
                    ], */
                    /* statistics: [
                        { label: "-stats [실행 중인 스캔에 대한 통계 표시]", value: "-stats" },
                        { label: "-sj, -stats-json [JSONL 형식으로 통계 표시]", value: "-sj" },
                        { label: "-si, -stats-interval [통계 업데이트를 표시하기까지 기다릴 초 수]", value: "-si" },
                        { label: "-mp, -metrics-port [nuclei 메트릭스를 노출할 포트]", value: "-mp" },
                    ], */
                    /* cloud: [
                        { label: "-auth [projectdiscovery 클라우드 API 키 구성]", value: "-auth" },
                        { label: "-cup, -cloud-upload [스캔 결과를 pdcp 대시보드에 업로드]", value: "-cup" },
                        { label: "-sid, -scan-id [주어진 스캔 ID에 스캔 결과 업로드]", value: "-sid" },
                    ], */
                }
            }
        },
        en: {
            translation: {
                title: "Web Fuzzing Dashboard",
                targetPlaceholder: "TARGET URL or IP",
                startButton: "Start Attack",
                copyMessage: "Options copied successfully",
                startAlert: "Fuzzing has started on {{target}}!",
                targetMissing: "Please enter the target URL or IP.",
                options: {
                    target: [
                        /* { label: "-u, -target [Scan target URL/host]", value: "-u" }, */
                        { label: "-l, -list [Path to a file containing target URLs/hosts (one per line)]", value: "-l" },
                        { label: "-resume [Resume scanning using resume.cfg]", value: "-resume" },
                        { label: "-sa, -scan-all-ips [Scan all IPs related to DNS records]", value: "-sa" },
                        { label: "-iv, -ip-version [IP version of the host to scan (4,6) - (default is 4)]", value: "-iv" },
                    ],
                    /* templates: [
                        { label: "-nt, -new-templates [Run only new templates added in the latest nuclei-templates release]", value: "-nt" },
                        { label: "-ntv, -new-templates-version [Run new templates added in a specific version]", value: "-ntv" },
                        { label: "-as, -automatic-scan [Automatically web scan using Wappalyzer technology detection]", value: "-as" },
                        { label: "-t, -templates [List of templates or template directories to execute (comma-separated, file)]", value: "-t" },
                        { label: "-turl, -template-url [List of template URLs or template URL files to execute (comma-separated)]", value: "-turl" },
                        { label: "-w, -workflows [List of workflows or workflow directories to execute (comma-separated, file)]", value: "-w" },
                        { label: "-wurl, -workflow-url [List of workflow URLs or workflow URL files to execute (comma-separated)]", value: "-wurl" },
                        { label: "-validate [Validate templates passed to nuclei]", value: "-validate" },
                        { label: "-nss, -no-strict-syntax [Disable strict syntax checking in templates]", value: "-nss" },
                        { label: "-td, -template-display [Display template contents]", value: "-td" },
                        { label: "-tl [List all available templates]", value: "-tl" },
                        { label: "-sign [Sign templates with the private key defined in the NUCLEI_SIGNATURE_PRIVATE_KEY environment variable]", value: "-sign" },
                        { label: "-code [Enable code protocol-based template loading]", value: "-code" },
                    ], */
                    filtering: [
                        { label: "-a, -author [Run templates based on authors (comma-separated, file)]", value: "-a" },
                        { label: "-tags [Run templates based on tags (comma-separated, file)]", value: "-tags" },
                        { label: "-etags, -exclude-tags [Exclude templates based on tags (comma-separated, file)]", value: "-etags" },
                        { label: "-itags, -include-tags [Tags that should be run even if excluded by default or configuration]", value: "-itags" },
                        { label: "-id, -template-id [Run templates based on template id (comma-separated, file, wildcard allowed)]", value: "-id" },
                        { label: "-eid, -exclude-id [Exclude templates based on template id (comma-separated, file)]", value: "-eid" },
                        { label: "-it, -include-templates [Templates that should be run even if excluded by default or configuration]", value: "-it" },
                        { label: "-et, -exclude-templates [Exclude templates or template directories (comma-separated, file)]", value: "-et" },
                        { label: "-em, -exclude-matchers [Exclude template matchers from results]", value: "-em" },
                        { label: "-s, -severity [Run templates based on severity. Possible values: info, low, medium, high, critical, unknown]", value: "-s" },
                        { label: "-es, -exclude-severity [Exclude templates based on severity. Possible values: info, low, medium, high, critical, unknown]", value: "-es" },
                        { label: "-pt, -type [Run templates based on protocol type. Possible values: dns, file, http, headless, tcp, workflow, ssl, websocket, whois, code, javascript]", value: "-pt" },
                        { label: "-ept, -exclude-type [Exclude templates based on protocol type. Possible values: dns, file, http, headless, tcp, workflow, ssl, websocket, whois, code, javascript]", value: "-ept" },
                        { label: "-tc, -template-condition [Run templates based on expression conditions]", value: "-tc" },
                    ],
                    /* output: [
                        { label: "-o, -output [Output file to write discovered issues/vulnerabilities]", value: "-o" },
                        { label: "-sresp, -store-resp [Store all requests/responses in the output directory through nuclei]", value: "-sresp" },
                        { label: "-srd, -store-resp-dir [Store all requests/responses in a user-defined directory (default 'output')]", value: "-srd" },
                        { label: "-silent [Display only results]", value: "-silent" },
                        { label: "-nc, -no-color [Disable color in output (ANSI escape codes)]", value: "-nc" },
                        { label: "-j, -jsonl [Write output in JSONL format]", value: "-j" },
                        { label: "-irr, -include-rr [Include request/response pairs in JSON, JSONL, Markdown output (only results)]", value: "-irr" },
                        { label: "-or, -omit-raw [Omit request/response pairs from JSON, JSONL, Markdown output (only results)]", value: "-or" },
                        { label: "-ot, -omit-template [Omit encoded templates from JSON, JSONL output]", value: "-ot" },
                        { label: "-nm, -no-meta [Disable printing of result metadata in CLI output]", value: "-nm" },
                        { label: "-ts, -timestamp [Enable timestamp printing in CLI output]", value: "-ts" },
                        { label: "-rdb, -report-db [Nuclei report database (always use this to retain reporting data)]", value: "-rdb" },
                        { label: "-ms, -matcher-status [Display match failure status]", value: "-ms" },
                        { label: "-me, -markdown-export [Directory to export results in Markdown format]", value: "-me" },
                        { label: "-se, -sarif-export [File to export results in SARIF format]", value: "-se" },
                        { label: "-je, -json-export [File to export results in JSON format]", value: "-je" },
                        { label: "-jle, -jsonl-export [File to export results in JSONL format]", value: "-jle" },
                    ], */
                    configurations: [
                        { label: "-config [Path to nuclei configuration file]", value: "-config" },
                        { label: "-fr, -follow-redirects [Enable following redirects for HTTP templates]", value: "-fr" },
                        { label: "-fhr, -follow-host-redirects [Follow redirects from the same host]", value: "-fhr" },
                        { label: "-mr, -max-redirects [Maximum number of redirects to follow for HTTP templates (default 10)]", value: "-mr" },
                        { label: "-dr, -disable-redirects [Disable redirects for HTTP templates]", value: "-dr" },
                        { label: "-rc, -report-config [Nuclei report module configuration file]", value: "-rc" },
                        { label: "-H, -header [Custom headers/cookies to include in all HTTP requests (header:value format)]", value: "-H" },
                        { label: "-V, -var [Custom variable in key=value format]", value: "-V" },
                        { label: "-r, -resolvers [File containing a list of resolvers for nuclei]", value: "-r" },
                        { label: "-sr, -system-resolvers [Use system DNS resolution as a fallback for errors]", value: "-sr" },
                        { label: "-dc, -disable-clustering [Disable request clustering]", value: "-dc" },
                        { label: "-passive [Enable manual HTTP response handling mode]", value: "-passive" },
                        { label: "-fh2, -force-http2 [Force HTTP/2 connection for requests]", value: "-fh2" },
                        { label: "-ev, -env-vars [Enable use of environment variables in templates]", value: "-ev" },
                        { label: "-cc, -client-cert [Client certificate file used for authentication against the target host (PEM encoded)]", value: "-cc" },
                        { label: "-ck, -client-key [Client key file used for authentication against the target host (PEM encoded)]", value: "-ck" },
                        { label: "-ca, -client-ca [Client CA file used for authentication against the target host (PEM encoded)]", value: "-ca" },
                        { label: "-sml, -show-match-line [Show match line for file templates]", value: "-sml" },
                        { label: "-ztls [Use ztls library]", value: "-ztls" },
                        { label: "-sni [TLS SNI hostname to use (default: input domain name)]", value: "-sni" },
                        { label: "-lfa, -allow-local-file-access [Allow file access from anywhere on the system]", value: "-lfa" },
                        { label: "-lna, -restrict-local-network-access [Block connections to local/private networks]", value: "-lna" },
                        { label: "-i, -interface [Network interface to use for network scans]", value: "-i" },
                        { label: "-at, -attack-type [Type of payload combinations to perform]", value: "-at" },
                        { label: "-sip, -source-ip [Source IP address to use for network scans]", value: "-sip" },
                        { label: "-rsr, -response-size-read [Maximum response size to read in bytes (default 10485760)]", value: "-rsr" },
                        { label: "-rss, -response-size-save [Maximum response size to save in bytes (default 1048576)]", value: "-rss" },
                        { label: "-reset [Remove all nuclei configurations and data files]", value: "-reset" },
                        { label: "-tlsi, -tls-impersonate [Enable experimental client hello TLS randomization]", value: "-tlsi" },
                    ],
                    interactsh: [
                        { label: "-iserver, -interactsh-server [Interactsh server URL for self-hosted instances]", value: "-iserver" },
                        { label: "-itoken, -interactsh-token [Authentication token for self-hosted interactsh server]", value: "-itoken" },
                        { label: "-interactions-cache-size [Number of requests to keep in interactions cache]", value: "-interactions-cache-size" },
                        { label: "-interactions-eviction [Number of seconds to wait before removing requests from cache]", value: "-interactions-eviction" },
                        { label: "-interactions-poll-duration [Number of seconds to wait between each interaction poll request]", value: "-interactions-poll-duration" },
                        { label: "-interactions-cooldown-period [Additional time to add to interactions polling before exit]", value: "-interactions-cooldown-period" },
                        { label: "-ni, -no-interactsh [Disable interactsh server for OAST tests]", value: "-ni" },
                    ],
                    fuzzing: [
                        { label: "-ft, -fuzzing-type [Override fuzzing type set in the template]", value: "-ft" },
                        { label: "-fm, -fuzzing-mode [Override fuzzing mode set in the template]", value: "-fm" },
                    ],
                    uncover: [
                        { label: "-uc, -uncover [Enable uncover engine]", value: "-uc" },
                        { label: "-uq, -uncover-query [Uncover search query]", value: "-uq" },
                        { label: "-ue, -uncover-engine [Uncover search engine]", value: "-ue" },
                        { label: "-uf, -uncover-field [Fields to return from uncover]", value: "-uf" },
                        { label: "-ul, -uncover-limit [Limit of uncover results to return]", value: "-ul" },
                        { label: "-ur, -uncover-ratelimit [Ratelimit for overriding engines with unknown ratelimit]", value: "-ur" },
                    ],
                    rate_limit: [
                        { label: "-rl, -rate-limit [Maximum requests per second]", value: "-rl" },
                        { label: "-rlm, -rate-limit-minute [Maximum requests per minute]", value: "-rlm" },
                        { label: "-bs, -bulk-size [Maximum number of hosts to analyze in parallel per template]", value: "-bs" },
                        { label: "-c, -concurrency [Maximum number of templates to execute in parallel]", value: "-c" },
                        { label: "-hbs, -headless-bulk-size [Maximum number of headless hosts to analyze in parallel per template]", value: "-hbs" },
                        { label: "-headc, -headless-concurrency [Maximum number of headless templates to execute in parallel]", value: "-headc" },
                    ],
                    optimizations: [
                        { label: "-timeout [Number of seconds to wait before timeout]", value: "-timeout" },
                        { label: "-retries [Number of times to retry failed requests]", value: "-retries" },
                        { label: "-ldp, -leave-default-ports [Leave default HTTP/HTTPS ports]", value: "-ldp" },
                        { label: "-mhe, -max-host-error [Maximum number of errors allowed before skipping a host in the scan]", value: "-mhe" },
                        { label: "-te, -track-error [Add the given error to the maximum host error monitoring list]", value: "-te" },
                        { label: "-nmhe, -no-mhe [Disable skipping hosts in scan based on errors]", value: "-nmhe" },
                        { label: "-project [Use project folder to avoid sending the same request multiple times]", value: "-project" },
                        { label: "-project-path [Set specific project path]", value: "-project-path" },
                        { label: "-spm, -stop-at-first-match [Stop processing HTTP requests after the first match]", value: "-spm" },
                        { label: "-stream [Stream mode - start without input sorting]", value: "-stream" },
                        { label: "-ss, -scan-strategy [Strategy to use while scanning]", value: "-ss" },
                        { label: "-irt, -input-read-timeout [Input read timeout]", value: "-irt" },
                        { label: "-nh, -no-httpx [Disable httpx probes for non-URL input]", value: "-nh" },
                        { label: "-no-stdin [Disable stdin processing]", value: "-no-stdin" },
                    ],
                    /* headless: [
                        { label: "-headless [Enable templates requiring headless browser support]", value: "-headless" },
                        { label: "-page-timeout [Time to wait for each page in headless mode]", value: "-page-timeout" },
                        { label: "-sb, -show-browser [Show browser screen when running templates in headless mode]", value: "-sb" },
                        { label: "-ho, -headless-options [Start headless chrome with additional options]", value: "-ho" },
                        { label: "-sc, -system-chrome [Use locally installed Chrome browser instead of the one installed by nuclei]", value: "-sc" },
                        { label: "-lha, -list-headless-action [Show available headless actions]", value: "-lha" },
                    ], */
                    /* debug: [
                        { label: "-debug [Display all requests and responses]", value: "-debug" },
                        { label: "-dreq, -debug-req [Display all sent requests]", value: "-dreq" },
                        { label: "-dresp, -debug-resp [Display all received responses]", value: "-dresp" },
                        { label: "-p, -proxy [List of http/socks5 proxies to use]", value: "-p" },
                        { label: "-pi, -proxy-internal [Send all internal requests through the proxy]", value: "-pi" },
                        { label: "-ldf, -list-dsl-function [Show a list of all supported DSL function signatures]", value: "-ldf" },
                        { label: "-tlog, -trace-log [File to log sent request trace]", value: "-tlog" },
                        { label: "-elog, -error-log [File to log sent request errors]", value: "-elog" },
                        { label: "-version [Display nuclei version]", value: "-version" },
                        { label: "-hm, -hang-monitor [Enable nuclei hang monitoring]", value: "-hm" },
                        { label: "-v, -verbose [Display detailed output]", value: "-v" },
                        { label: "-profile-mem [Optional nuclei memory profile dump file]", value: "-profile-mem" },
                        { label: "-vv [Display loaded templates during scan]", value: "-vv" },
                        { label: "-svd, -show-var-dump [Show variable dump for debugging]", value: "-svd" },
                        { label: "-ep, -enable-pprof [Enable pprof debugging server]", value: "-ep" },
                        { label: "-tv, -templates-version [Display the version of installed nuclei-templates]", value: "-tv" },
                        { label: "-hc, -health-check [Run a health check]", value: "-hc" },
                    ], */
                    /* update: [
                        { label: "-up, -update [Update nuclei engine to the latest release version]", value: "-up" },
                        { label: "-ut, -update-templates [Update nuclei-templates to the latest release version]", value: "-ut" },
                        { label: "-ud, -update-template-dir [Custom directory to install/update nuclei-templates]", value: "-ud" },
                        { label: "-duc, -disable-update-check [Disable automatic nuclei/templates update checks]", value: "-duc" },
                    ], */
                    /* statistics: [
                        { label: "-stats [Display statistics for the running scan]", value: "-stats" },
                        { label: "-sj, -stats-json [Display statistics in JSONL format]", value: "-sj" },
                        { label: "-si, -stats-interval [Number of seconds to wait before displaying statistics updates]", value: "-si" },
                        { label: "-mp, -metrics-port [Port to expose nuclei metrics]", value: "-mp" },
                    ], */
                    /* cloud: [
                        { label: "-auth [Configure projectdiscovery cloud API key]", value: "-auth" },
                        { label: "-cup, -cloud-upload [Upload scan results to pdcp dashboard]", value: "-cup" },
                        { label: "-sid, -scan-id [Upload scan results to a given scan ID]", value: "-sid" },
                    ], */
                }
            }
        }
    }
}, function (err, t) {
    updateUI();
    loadOptions(); // 초기 로드 시 옵션 로드
});

const dropdownButton = document.querySelector('.dropdown-button');
const checkboxList = document.querySelector('.checkbox-list');

// 옵션 로드 함수
function loadOptions() {
    const optionsContainer = document.querySelector('.checkbox-list');
    optionsContainer.innerHTML = ''; // 기존 내용 초기화

    const currentLangOptions = i18next.t('options', { returnObjects: true });

    // currentLangOptions가 정의되어 있는지 확인
    if (!currentLangOptions) {
        console.error('옵션이 정의되지 않았습니다.');
        return;
    }

    // TARGET 섹션 옵션 추가
    const targetOptions = currentLangOptions.target.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>TARGET</h3>${targetOptions}`;

    /* // TEMPLATE 섹션 옵션 추가
    const templateOptions = currentLangOptions.templates.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>TEMPLATES</h3>${templateOptions}`; */

    // filtering 섹션 옵션 추가
    const filteringOptions = currentLangOptions.filtering.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>FILTERING</h3>${filteringOptions}`;

    /* // output 섹션 옵션 추가
    const outputingOptions = currentLangOptions.output.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>OUPUT</h3>${outputingOptions}`; */

    // configurations 섹션 옵션 추가
    const configurationsingOptions = currentLangOptions.configurations.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>CONFIGURAIONTS</h3>${configurationsingOptions}`;

    // interactsh 섹션 옵션 추가
    const interactshingOptions = currentLangOptions.interactsh.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>INTERACTSH</h3>${interactshingOptions}`;

    // fuzzing 섹션 옵션 추가
    const fuzzingingOptions = currentLangOptions.fuzzing.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>FUZZING</h3>${fuzzingingOptions}`;

    // uncover 섹션 옵션 추가
    const uncoveringOptions = currentLangOptions.uncover.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>UNCOVER</h3>${uncoveringOptions}`;

    // rate_limit 섹션 옵션 추가
    const rate_limitingOptions = currentLangOptions.rate_limit.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>RATE_LIMIT</h3>${rate_limitingOptions}`;

    // optimizations 섹션 옵션 추가
    const optimizationsingOptions = currentLangOptions.optimizations.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>OPTIMIZATIONS</h3>${optimizationsingOptions}`;

    /* // headless 섹션 옵션 추가
    const headlessingOptions = currentLangOptions.headless.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>HEADLESS</h3>${headlessingOptions}`;

    // debug 섹션 옵션 추가
    const debugingOptions = currentLangOptions.debug.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>DEBUG</h3>${debugingOptions}`;

    // update 섹션 옵션 추가
    const updateingOptions = currentLangOptions.update.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>UPDATE</h3>${updateingOptions}`;

    // statistics 섹션 옵션 추가
    const statisticsingOptions = currentLangOptions.statistics.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>STATISTICS</h3>${statisticsingOptions}`;

    // cloud 섹션 옵션 추가
    const cloudingOptions = currentLangOptions.cloud.map(option => {
        return `<label><input type="checkbox" value="${option.value}"> ${option.label}</label>`;
    }).join('');

    optionsContainer.innerHTML += `<h3>CLOUD</h3>${cloudingOptions}`; */

}

// 선택된 체크박스 값을 가져오는 함수
function getSelectedOptions() {
    const checkboxes = checkboxList.querySelectorAll('input[type="checkbox"]');
    const selectedOptions = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.value);
        }
    });
    return selectedOptions;
}

function showCopyMessage() {
    const selectedOptions = getSelectedOptions().join(', '); // 선택된 옵션들을 문자열로 변환
    navigator.clipboard.writeText(selectedOptions).then(() => {
        const copyMessageElement = document.getElementById('copyMessage');
        copyMessageElement.textContent = i18next.t('copyMessage'); // 옵션 복사 완료 메시지
        copyMessageElement.style.display = 'block'; // 메시지 표시
        setTimeout(() => {
            copyMessageElement.style.display = 'none'; // 3초 후 메시지 숨기기
        }, 3000);
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
    });
}

function updateUI() {
    document.querySelector('.start-button').textContent = i18next.t('startButton');
    document.querySelector('#targetInput').placeholder = i18next.t('targetPlaceholder');
}

// 언어 변경 함수
function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    i18next.changeLanguage(selectedLanguage, () => {
        updateUI();
        loadOptions(); // 언어 변경 시 옵션 재로드
    });
}

/* // .env 파일에서 환경 변수를 로드
require('dotenv').config();

// WebSocket 연결에 사용할 IP와 포트
const websocketIp = process.env.WEBSOCKET_IP;
const websocketPort = process.env.WEBSOCKET_PORT;
 */

let socket = new WebSocket("ws://192.168.16.218:6789");

socket.onopen = function () {
    console.log("WebSocket connection established.");
};

socket.onmessage = function (event) {
    console.log("Message from server: ", event.data);
};

socket.onerror = function (error) {
    console.error("WebSocket Error: ", error);
};

socket.onclose = function () {
    console.log("WebSocket connection closed.");
};


// 공격 시작 함수
function startAttack() {
    const targetInput = document.getElementById("targetInput").value;
    if (!targetInput) {
        alert("타겟 URL 또는 IP를 입력하세요.");
        return;
    }

    // 체크된 옵션들이 있는지 가져옴
    const selectedOptions = getSelectedOptions();

    // 사용자 입력과 옵션 값을 콘솔에 출력
    console.log("사용자 입력 URL/IP:", targetInput);
    console.log("선택된 옵션들:", selectedOptions);
    
    // 대시보드 애니메이션
    const dashboard = document.querySelector('.dashboard');
    const consoleDiv = document.querySelector('.console');

    // 애니메이션 적용하여 대시보드 왼쪽으로 이동
    dashboard.style.transition = "transform 0.5s ease";
    dashboard.style.transform = "translateX(-100%)";

    // 애니메이션 후 콘솔 표시
    setTimeout(() => {
        consoleDiv.style.display = "block";
        populateConsole(selectedOptions); // 선택된 옵션에 맞춰 콘솔 구성
    }, 500);
}

// 콘솔에 인자 입력 필드를 추가하는 함수
function populateConsole(selectedOptions) {
    const consoleContent = document.getElementById('console-content');
    consoleContent.innerHTML = ''; // 기존 내용 초기화

    // 각각의 선택된 옵션에 대해 인자 입력 필드 생성
    selectedOptions.forEach(option => {
        const inputLabel = document.createElement('label');
        inputLabel.innerText = ` ${option}: `;

        const inputField = document.createElement('input'); 
        inputField.type = 'text';
        inputField.name = option;
        inputField.placeholder = `${option}의 인자값`;

        inputLabel.appendChild(inputField);
        consoleContent.appendChild(inputLabel);
        consoleContent.appendChild(document.createElement('br'));
    });
}

function sendPacket() {
    const targetInput = document.getElementById("targetInput").value;
    const targets = targetInput.split(",").map(url => url.trim());  // 쉼표로 URL 구분하여 배열로 변환
    const selectedOptions = getSelectedOptions();
    const optionsWithInput = []; // 사용자 입력을 포함한 옵션 배열

    // 선택된 옵션과 사용자 입력을 통합하여 배열 구성
    selectedOptions.forEach(option => {
        optionsWithInput.push(option); // 체크된 옵션 추가

        // 각 옵션에 대해 입력된 값을 배열에 추가
        const inputValue = document.querySelector(`input[name='${option}']`).value;
        if (inputValue) {
            optionsWithInput.push(inputValue); // 사용자 입력 추가
        }
    });

    // target 개수에 따라 command와 target 데이터 타입 결정
    const commandType = targets.length > 1 ? "multiple_execute" : "execute";
    const targetData = targets.length > 1 ? targets : targets[0];  // 단일일 때는 문자열로 처리

    // 최종 데이터 구성
    const data = {
        command: commandType,  // 2개 이상일 때 "multiple_execute", 그렇지 않으면 "execute"
        target: targetData,    // target이 하나일 때는 문자열로, 여러 개일 때는 배열로
        options: optionsWithInput // 사용자 입력이 포함된 옵션
    };

    // 웹소켓으로 JSON 데이터 전송
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data)); // 데이터 전송
        console.log(`공격이 ${targetInput} 대상으로 시작되었습니다.`);
    } else {
        alert("WebSocket 연결이 준비되지 않았습니다. 다시 시도해 주세요.");
    }
}




// 체크된 체크박스 값을 가져오는 함수
function getSelectedOptions() {
    const checkboxes = document.querySelectorAll('.checkbox-list input[type="checkbox"]');
    const selectedOptions = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.value);
        }
    });
    return selectedOptions;
}




// 웹소켓과 통신 테스트
const websocket = new WebSocket("ws://192.168.16.218:6789");

websocket.onopen = function (event) {
    console.log("Connected to Python WebSocket server");

    // 서버로 데이터를 전송
    const message = {
        command: "check"
    };
    websocket.send(JSON.stringify(message));
};

websocket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("Received from server:", data);
    // 데이터 처리 로직을 여기에 추가하세요.
};

websocket.onclose = function (event) {
    console.log("Disconnected from WebSocket server");
};

websocket.onerror = function (error) {
    console.log("WebSocket error:", error);
};


// 콘솔 창 닫기 함수
function closeConsole() {
    const dashboard = document.querySelector('.dashboard');
    const consoleDiv = document.querySelector('.console');

    // 대시보드를 원래 위치로 되돌리기
    dashboard.style.transform = "translateX(0)";

    // 콘솔 숨기기
    consoleDiv.style.display = "none";
}

function toggleOptionsTab() {
    const optionsTab = document.getElementById("optionsTab");
    if (optionsTab.style.display === "none" || !optionsTab.style.display) {
        optionsTab.style.display = "block";
    } else {
        optionsTab.style.display = "none";
    }
}



function closeOptionsTab() {
    document.getElementById("optionsTab").style.display = "none";
}

// WebSocket 연결 설정
const socket = new WebSocket("ws://192.168.16.218:6789"); 

// WebSocket 연결 성공 시 실행되는 함수
socket.onopen = function(event) {
    console.log("WebSocket 연결이 열렸습니다.");
};

// WebSocket 메시지 수신 시 실행되는 함수
socket.onmessage = function(event) {
    const message = event.data;
    
    // 받은 메시지가 "Nuclie Finish"일 경우 "ai_start" 명령 전송
    if (message === "Nuclie Finish") {
        const commandMessage = JSON.stringify({ command: "ai_start" });
        socket.send(commandMessage);
        console.log("백엔드로 'ai_start' 명령을 전송했습니다.");
    }
};

// WebSocket 연결 종료 시 실행되는 함수
socket.onclose = function(event) {
    console.log("WebSocket 연결이 종료되었습니다.");
};

// WebSocket 에러 발생 시 실행되는 함수
socket.onerror = function(error) {
    console.log("WebSocket 에러:", error);
};
