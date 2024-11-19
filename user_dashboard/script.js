
i18next.init({
    lng: 'ko', // 초기 언어
    resources: {
        ko: {
            translation: {
                title: "웹 퍼징 대시보드",
                targetPlaceholder: "TARGET URL or IP",
                startButton: "옵션\n확인",
                copyMessage: "옵션 복사 완료",
                startAlert: "{{target}}으로 퍼징이 시작되었습니다!",
                targetMissing: "타겟 URL 또는 IP를 입력하세요.",
                stopAI: "AI 중단",
                dropdownButton: "옵션 선택",
                aiUsage: "AI를 사용하시겠습니까?",
                optionsCheck: "옵션 확인",
                closeButton: "닫기",
                startAttack: "공격 시작",
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
                startButton: "Options Check",
                copyMessage: "Options copied successfully",
                startAlert: "Fuzzing has started on {{target}}!",
                targetMissing: "Please enter the target URL or IP.",
                stopAI: "Stop ai",
                dropdownButton: "Options seclect",
                aiUsage: "Would you like to use AI?",
                optionsCheck: "Options check",
                closeButton: "Close",
                startAttack: "Start Attack",
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
const optionsWithArguments = {
    "-u": true, "-target": true,
    "-l": true, "-resume": true,
    "-iv": true, "-ntv": true,
    "-t": true, "-turl": true,
    "-w": true, "-wurl": true,
    "-a": true, "-tags": true,
    "-etags": true, "-id": true,
    "-eid": true, "-itags": true,
    "-s": true, "-es": true,
    "-pt": true, "-ept": true,
    "-o": true, "-srd": true,
    "-me": true, "-se": true,
    "-je": true, "-jle": true,
    "-config": true, "-H": true,
    "-V": true, "-r": true,
    "-cc": true, "-ck": true,
    "-ca": true, "-sni": true,
    "-sip": true, "-at": true,
    "-iserver": true, "-itoken": true,
    "-ul": true, "-ur": true,
    "-rl": true, "-rlm": true,
    "-bs": true, "-c": true,
    "-tlog": true, "-elog": true,
    "-ud": true, "-timeout": true,
};

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
    const checkboxes = document.querySelectorAll('.checkbox-list input[type="checkbox"]');
    return Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
}

function updateUI() {
    document.querySelector('.start-button').textContent = i18next.t('startButton');
    document.querySelector('#targetInput').placeholder = i18next.t('targetPlaceholder');
    document.querySelector('.ai-stop-button').textContent = i18next.t('stopAI'); 
    document.querySelector('.dropdown-button').textContent = i18next.t('dropdownButton')
    document.querySelector('#aiLabel').textContent = i18next.t('aiUsage'); // 체크박스 번역 추가
    document.querySelector('#consoleTitle').textContent = i18next.t('optionsCheck'); // 제목 번역
    document.querySelector('#closeButton').textContent = i18next.t('closeButton'); // 닫기 버튼 번역
    document.querySelector('#sendButton').textContent = i18next.t('startAttack'); // 공격 시작 버튼 번역
}

function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    i18next.changeLanguage(selectedLanguage, () => {
        updateUI();
        loadOptions();
    });
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

// 콘솔 창 닫기 함수
function closeConsole() {
    const dashboard = document.querySelector('.dashboard');
    const consoleDiv = document.querySelector('.console');

    // 대시보드를 원래 위치로 되돌리기
    dashboard.style.transform = "translateX(0)";

    // 콘솔 숨기기
    consoleDiv.style.display = "none";
}

// WebSocket 연결 설정 (단일 인스턴스)
const websocket = new WebSocket("ws://192.168.16.218:6789");

websocket.onopen = function () {
    console.log("WebSocket connection established.");
    
    // 초기 연결 시 check 명령 전송
    websocket.send(JSON.stringify({ command: "check" }));
};

websocket.onmessage = function (event) {
    const data = JSON.parse(event.data);

    // 메시지의 command를 기준으로 작업을 구분
    switch (data.message) {
        case "Target Valid":
            console.log("Target is valid.");
            // ai_start 명령을 전송
            websocket.send(JSON.stringify({ command: "ai_start" }));
            console.log("Sending ai_start command to the server."); // ai_start 전송 로그
            break;

        case "executeFinish":
            console.log("Nuclei Execute Finish");
            break;

        case "ai_start":
            console.log("AI start command processed:", data);
            break;

        default:
            console.log("Unrecognized command:", data.message);
    }
};

/* websocket.onmessage = function (event) {
    console.log(`Received: ${event.data}`);
    const data = JSON.parse(event.data);

    // 메시지의 command를 기준으로 작업을 구분
    switch (data.command) {
        case "check":
            console.log("Check command received:", data);
            break;

        case "executeFinish":
            console.log("Nuclei Execute Finish");
            // ai_start 명령을 서버로 전송
            websocket.send(JSON.stringify({ command: "ai_start" }));
            break;
    
        case "ai_start":
            console.log("AI start command processed:", data);
            break;

        default:
            console.log("Unrecognized command:", data.command);
    }
}; */

websocket.onerror = function (error) {
    console.error("WebSocket Error:", error);
};

websocket.onclose = function () {
    console.log("WebSocket connection closed.");
};

// 공격 시작 함수
function startAttack() {
    const targetInput = document.getElementById("targetInput").value;
    if (!targetInput) {
        alert("타겟 URL 또는 IP를 입력하세요.");
        return;
    }

    const selectedOptions = getSelectedOptions();
    console.log("사용자 입력 URL/IP:", targetInput);
    console.log("선택된 옵션들:", selectedOptions);

    const dashboard = document.querySelector('.dashboard');
    const consoleDiv = document.querySelector('.console');

    dashboard.style.transition = "transform 0.5s ease";
    dashboard.style.transform = "translateX(-100%)";

    setTimeout(() => {
        consoleDiv.style.display = "block";
        populateConsole(selectedOptions);
    }, 500);
}

// 콘솔에 인자 입력 필드를 추가하는 함수
function populateConsole(selectedOptions) {
    const consoleContent = document.getElementById('console-content');
    consoleContent.innerHTML = ''; // 기존 내용 초기화

    selectedOptions.forEach(option => {
        const inputLabel = document.createElement('label');
        inputLabel.innerText = `${option}: `;

        if (optionsWithArguments[option]) {
            // 인자값이 필요한 옵션
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.name = option;
            inputField.placeholder = `${option} parameter value`;
            inputLabel.appendChild(inputField);
        } else {
            // 인자값이 필요하지 않은 옵션
            const message = document.createElement('span');
            message.innerText = "no parameter value";
            message.style.color = "#888"; // 메시지 스타일 설정
            inputLabel.appendChild(message);
        }

        consoleContent.appendChild(inputLabel);
        consoleContent.appendChild(document.createElement('br'));
    });
}

function sendPacket() {
    const targetInput = document.getElementById("targetInput").value;
    const targets = targetInput.split(",").map(url => url.trim());
    const selectedOptions = getSelectedOptions();
    const optionsWithInput = selectedOptions.map(option => {
        const inputValue = document.querySelector(`input[name='${option}']`).value;
        return inputValue ? [option, inputValue] : [option];
    }).flat();

    // AI 체크박스 상태 확인
    const aiCheckbox = document.getElementById("aiCheckbox").checked;
    const aiOption = aiCheckbox ? "true" : "false";

    const data = {
        command: targets.length > 1 ? "multiple_execute" : "execute",
        target: targets.length > 1 ? targets : targets[0],
        options: optionsWithInput,
        Ai: aiOption  // AI 옵션 추가
    };

    // WebSocket으로 데이터 전송
    if (websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(data));
        console.log(`공격이 ${targetInput} 대상으로 시작되었습니다. (AI 옵션: ${aiOption})`);
    } else {
        alert("WebSocket 연결이 준비되지 않았습니다. 다시 시도해 주세요.");
    }
}

function stopAI() {
    const data = {
        command: "ai_stop"
    };

    // WebSocket으로 데이터 전송
    if (websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(data));
        console.log("AI 중단 명령을 서버로 전송했습니다.");
    } else {
        alert("WebSocket 연결이 준비되지 않았습니다. 다시 시도해 주세요.");
    }
}
