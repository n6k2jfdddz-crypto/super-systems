# KALI NEXUS Mobile (iOS)

Versão estática/PWA do painel, feita para abrir no Safari do iPhone. Não instala Kali Linux no iOS.

## Recursos
- Dashboard responsivo com visual cyber.
- Triagem estática local no navegador: tamanho, assinatura simples, SHA-256 e strings ASCII de APK/EXE/DLL/ELF/SO/BIN (limite 25 MB).
- Informações de conectividade que o Safari permite expor.
- Orientações para VPN e ferramentas de engenharia reversa.

## Como usar no iPhone
1. Publique o conteúdo desta pasta em um host estático HTTPS (por exemplo, GitHub Pages).
2. Abra o endereço HTTPS no Safari do iPhone.
3. Toque em Compartilhar > Adicionar à Tela de Início.
4. Abra pelo ícone KALI NEXUS.

Também pode abrir `index.html` para uma prévia, mas instalação PWA/offline exige HTTPS (ou localhost).

## Limitações reais do iOS
Uma página web não pode executar Kali Linux, instalar Ghidra/JADX, executar APK/EXE, acessar interfaces de rede de baixo nível, listar dispositivos Wi-Fi, controlar túneis VPN nem encadear duas VPNs. O atalho Ajustes é apenas um link de conveniência e pode não ser aceito por todas as versões do iOS.
A análise acontece no navegador do próprio aparelho; nada é enviado para um servidor por este código.
Use somente arquivos próprios ou autorizados.
