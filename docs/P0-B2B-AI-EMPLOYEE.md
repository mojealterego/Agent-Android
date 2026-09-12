# P0 — B2B AI Employee

## Decyzja

`Agent-Android` zostaje wybrany jako **główny własny fundament wykonawczy** pierwszego produktu P0: **B2B AI Employee**. Repo nie jest jeszcze produktem końcowym; pozostaje warstwą rdzenia, z której zostanie wyprowadzona aplikacja B2B.

## Cel produktu

AI Employee ma wykonywać ograniczony zestaw powtarzalnych procesów przedsiębiorstwa przez agent runtime, workflow, wiedzę firmową i integracje, przy zachowaniu kontroli człowieka nad działaniami konsekwencyjnymi.

## Pierwszy zakres

1. Tożsamość użytkownika, organizacja i RBAC.
2. Sesja agenta oraz izolacja tenantów.
3. Rejestrowanie narzędzi i jawna polityka uprawnień.
4. Approval gate dla działań konsekwencyjnych.
5. Pamięć rozmów i warstwa wiedzy/RAG z kontrolą dostępu.
6. Workflow i harmonogramowanie z limitem uprawnień.
7. Audyt wszystkich wywołań narzędzi.
8. Integracje biznesowe dodawane dopiero po zdefiniowaniu kontraktu i modelu uprawnień.

## Poza MVP

- autonomiczne operacje finansowe,
- nieograniczone wykonywanie kodu,
- działania administracyjne bez approval,
- obchodzenie zabezpieczeń usług zewnętrznych,
- niekontrolowane akcje na urządzeniu,
- ogólny agent bez zdefiniowanego przypadku użycia.

## Architektura docelowa

`Client → API/Auth → Agent Runtime → Policy/Authorization → Tool Registry/MCP → Integrations`

Warstwy przekrojowe:

`Tenant Isolation + Secrets + Audit + Observability + Evaluation + Quotas`

Warstwa Android pozostaje klientem uprzywilejowanych funkcji urządzenia. Uprawnienia urządzenia nie mogą być traktowane jako substytut autoryzacji serwerowej.

## Kolejność refaktoryzacji

### R0 — kontrakty

- wersjonowane kontrakty żądań i odpowiedzi,
- `organizationId`, `actorId`, `sessionId`,
- kontrakt autoryzacji narzędzia,
- rozdzielenie decyzji `allowed` od `approvalRequired`.

### R1 — Auth / tenancy

- ustalić źródło tożsamości,
- wymusić kontekst organizacji,
- testy cross-tenant denial,
- fail-closed przy braku wymaganego kontekstu.

### R2 — Tool authorization

- allowlist narzędzi,
- polityki per organizacja/rola/agent,
- jawny typ ryzyka,
- blokada domyślna.

### R3 — Approval state machine

- `requested → approved|rejected|expired`,
- jednorazowe i czasowo ograniczone zgody,
- powiązanie zgody z konkretnym narzędziem, argumentami i aktorem,
- audyt decyzji.

### R4 — MCP / execution isolation

- separacja procesu,
- ograniczenie filesystem/network,
- limity czasu i zasobów,
- brak sekretów w środowisku narzędzi, jeśli nie są konieczne.

### R5 — testy i obserwowalność

- testy kontraktowe,
- testy authz,
- testy approval,
- testy izolacji tenantów,
- testy integracyjne,
- trace ID i audyt akcji,
- metryki kosztu i czasu wykonania.

## Kryterium wejścia do produkcji

Nie wystarczy działający demo-flow. Produkt może zostać oznaczony jako produkcyjny dopiero po przejściu testów bezpieczeństwa, integracyjnych, E2E, migracji/recovery, kontroli kosztów oraz reprodukowalnego builda klienta i usług.
