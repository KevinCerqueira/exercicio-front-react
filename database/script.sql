SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

use `reactfront_db`;

CREATE TABLE IF NOT EXISTS `endereco` (
  `idendereco` INT NOT NULL AUTO_INCREMENT,
  `logradouro` VARCHAR(100) NOT NULL,
  `cep` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`idendereco`));

CREATE TABLE IF NOT EXISTS `clinica` (
  `idclinica` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL,
  `whatsapp` VARCHAR(15) NOT NULL,
  `idendereco` INT NOT NULL,
  PRIMARY KEY (`idclinica`),
  INDEX `fk_clinica_endereco_idx` (`idendereco` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `whatsapp_UNIQUE` (`whatsapp` ASC),
  UNIQUE INDEX `idendereco_UNIQUE` (`idendereco` ASC),
  CONSTRAINT `fk_clinica_endereco`
    FOREIGN KEY (`idendereco`)
    REFERENCES `endereco` (`idendereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE IF NOT EXISTS `servico` (
  `idservico` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idservico`));

CREATE TABLE IF NOT EXISTS `servico_clinica` (
  `idservico` INT NOT NULL,
  `idclinica` INT NOT NULL,
  PRIMARY KEY (`idservico`, `idclinica`),
  INDEX `fk_servico_has_clinica_clinica1_idx` (`idclinica` ASC),
  INDEX `fk_servico_has_clinica_servico1_idx` (`idservico` ASC),
  CONSTRAINT `fk_servico_has_clinica_servico1`
    FOREIGN KEY (`idservico`)
    REFERENCES `servico` (`idservico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_servico_has_clinica_clinica1`
    FOREIGN KEY (`idclinica`)
    REFERENCES `clinica` (`idclinica`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `endereco` (idendereco, logradouro, cep) VALUES
(1, 'Rua Barão do Triunfo, 612 / CJ 901', '04602-002'), 
(2, 'Rua Joaquim Guarani, 105', '04707-060'), 
(3, 'Rua do Estilo Barroco, 452', '04709-011'), 
(4, 'AV. ADOLFO PINHEIRO, 2464 / 3º ANDAR SALA 31', '04734-902'), 
(5, 'Rua Francisco Romeiro Sobrinho, 141', '04710-180'), 
(6, 'Rua Enxovia, 472 / Conj 2009', '04711-030'), 
(7, 'Rua Francisco de Morais, 219', '04714-010'), 
(8, 'Rua Indiana, 1148 / Conj 02', '04562-002'), 
(9, 'Avenida Engenheiro Luiz Carlos Berrini, 1140', '04571-000'), 
(10, 'Avenida das Nações Unidas, 11633 / 7º Andar', '04578-000');

INSERT INTO `clinica` (idclinica, nome, email, whatsapp, idendereco) VALUES 
(1, 'EHS SOLUÇÕES INTELIGENTES', 'contato@ehsss.com.br', '(11) 93477-9755', 1),
(2, 'SA ASSESSORIA', 'selma@saassessoria.com.br', '(11) 95182-8221', 2),
(3, 'GEREMED SAUDE E SEGURANCA OCUPACIONAL', 'nubia@geremed.com.br', '(11) 95536-9651', 3),
(4, 'CEMIP SAUDE', 'cemip@cemip.com.br', '(11) 95521-1900', 4),
(5, 'OCUPACIONAL SS SAÚDE E SEGURANÇA DO TRABALHO', 'cleiton@ocupacionalss.com.br', '(11) 95181-0102', 5),
(6, 'GBEN - GESTAO DE BENEFICIOS OCUPACIONAIS', 'VANESSA@GBEN.COM.BR', '(11) 92776-2700', 6),
(7, 'GRUPO MORATTI', '', '(11) 93567-8031', 7),
(8, 'HEALTH MANAGER', 'comercial1@healthmanager.com.br', '(11) 95091-7416', 8),
(9, 'S&MED CONSULTORIA E GESTAO DE SSO', 'CONTATO@SMEDGESTAO.COM.BR', '(11) 94280-8636', 9),
(10, 'MANTRIS', 'credenciamento@mantris.com.br', '(11) 92141-8000', 10);

INSERT INTO `servico` (idservico, nome) VALUES 
(1, 'Exames Clínicos'),
(2, 'Exames Complementares'),
(3, 'PPRA'),
(4, 'PCMSO');

INSERT INTO `servico_clinica` (idclinica, idservico) VALUES 
(1, 1),(1, 2),(1, 3),(1, 4),
(2, 1),(2, 4),
(3, 1),(3, 3),(3, 4),
(4, 1),(4, 2),
(5, 1),(5, 2),(5, 3),(5, 4),
(6, 1),(6, 2),(6, 3),(6, 4),
(7, 1),
(8, 1),(8, 2),(8, 3),(8, 4),
(9, 1),
(10, 1),(10, 3),(10, 4);
