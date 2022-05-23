USE InvestApp;

If  exists  
(Select *
   From  sys.check_constraints 
   Where object_id  =  OBJECT_ID(N'dbo.CK_Produto')  
     and parent_object_id = OBJECT_ID(N'dbo.Produto')) 
   ALTER TABLE  dbo.Produto
      DROP CONSTRAINT CK_Produto; 
IF  EXISTS 
  (select * 
    From  sys.objects 
    Where object_id = OBJECT_ID(N'dbo.Produto')  
      and type in (N'U')) 
   DROP TABLE dbo.Produto; 

If  exists  
(Select *
   From  sys.check_constraints 
   Where object_id  =  OBJECT_ID(N'dbo.CK_Receita')  
     and parent_object_id = OBJECT_ID(N'dbo.Receita')) 
   ALTER TABLE  dbo.Receita 
      DROP CONSTRAINT CK_Receita; 
IF  EXISTS 
  (select * 
    From  sys.objects 
    Where object_id = OBJECT_ID(N'dbo.Receita')  
      and type in (N'U')) 
   DROP TABLE dbo.Receita; 

If  exists  
(Select * 
   From  sys.check_constraints 
   Where object_id  =  OBJECT_ID(N'dbo.CK_Despesa')  
     and parent_object_id = OBJECT_ID(N'dbo.Despesa')) 
   ALTER TABLE  dbo.Despesa 
      DROP CONSTRAINT CK_Despesa; 
IF  EXISTS 
  (select * 
    From  sys.objects 
    Where object_id = OBJECT_ID(N'dbo.Despesa')  
      and type in (N'U')) 
   DROP TABLE dbo.Despesa; 

If  exists  
(Select * 
   From  sys.check_constraints 
   Where object_id  =  OBJECT_ID(N'dbo.CK_Conta')  
     and parent_object_id = OBJECT_ID(N'dbo.Conta')) 
   ALTER TABLE  dbo.Conta 
      DROP CONSTRAINT CK_Conta; 
IF  EXISTS
  (select * 
    From  sys.objects 
    Where object_id = OBJECT_ID(N'dbo.Conta')  
      and type in (N'U')) 
   DROP TABLE dbo.Conta; 

If  exists  
(Select * 
   From  sys.check_constraints 
   Where object_id  =  OBJECT_ID(N'dbo.CK_Usuario')  
     and parent_object_id = OBJECT_ID(N'dbo.Usuario')) 
   ALTER TABLE  dbo.Usuario 
      DROP CONSTRAINT CK_Usuario; 
IF  EXISTS 
  (select * 
    From  sys.objects 
    Where object_id = OBJECT_ID(N'dbo.Usuario')  
      and type in (N'U')) 
   DROP TABLE dbo.Usuario; 

CREATE TABLE dbo.Usuario ( 
  CodUsuario int identity(1,1) Not Null ,
  Email varchar(45) unique Not Null , 
  Nome varchar(45) Not Null , 
  Sobrenome varchar(45) Not Null , 
  Senha varchar(45) Not Null , 
  Constraint PK_Usuario Primary Key Clustered (CodUsuario), 
  Constraint CK_Usuario CHECK (Email like '%___@___%'),
  Constraint CK_Usuario_Nome CHECK (Nome not like '%[^a-z]%' /*'%[^0-9]%'*/), 
  Constraint CK_Usuario_Sobrenome CHECK (Sobrenome not like '%[^a-z]%'), 
  /*Constraint CK_Usuario_Senha CHECK (Senha not like '/^[a-zA-Z\s]*$/'),*/ 
); 

  

CREATE TABLE dbo.Conta ( 
  CodConta int identity(1,1) Not Null ,
  CodUsuario int Not Null ,
  Nome varchar(45) unique Not Null , 
  NomeBanco varchar(45) Not Null , 
  Saldo numeric(12,2) Not Null , 
  Agencia char(4), 
  Numero char(5), 
  PIX varchar(45), 
  Rendimento numeric(2), 
  Constraint PK_Conta Primary Key Clustered (CodConta, CodUsuario), 
  Constraint FK_Conta_CodUsuario Foreign Key (CodUsuario)
    References dbo.Usuario (CodUsuario) On Delete Cascade on Update Cascade,
  Constraint CK_Conta CHECK (Nome not like '%[^a-z]%'),
  Constraint CK_Conta_NomeBanco CHECK (NomeBanco not like '%[^a-z]%'), 
  /*Constraint CK_Conta_Saldo CHECK (Saldo not like '%[^0-9]%'), */
  Constraint CK_Conta_Agencia CHECK (Agencia not like '%[^a-z]%'), 
  Constraint CK_Conta_Numero CHECK (Numero not like '%[^0-9]%'), 
  /*Constraint CK_Conta_PIX CHECK (PIX not like '%[^0-9]%'), */
  Constraint CK_Conta_Rendimento CHECK (Rendimento not like '%[^0-9]%'), 
); 

  /* NOME COMO PK DA CONTA, AJUSTAR FK RECEITA */

CREATE TABLE dbo.Receita (
  CodReceita int identity(1,1) Not Null , 
  CodConta int Not Null ,
  CodUsuario int Not Null ,
  Valor numeric(10,2) Not Null , 
  Categoria varchar(45) Not Null , 
  Programacao char(1) Not Null , 
  Periodo varchar(45) Not Null , 
  Recebedor varchar(45) Not Null, 
  Constraint PK_Receita Primary Key Clustered (CodReceita, CodConta, CodUsuario), 
  Constraint FK_Receita_CodConta_CodUsuario Foreign Key (CodConta, CodUsuario)
    References dbo.Conta (CodConta, CodUsuario) On Delete Cascade on Update Cascade,
  Constraint CK_Receita CHECK (CodReceita >= 1), 
  /*Constraint CK_Receita_Valor CHECK (Valor not like '%[^0-9]%'), */
  Constraint CK_Receita_Categoria CHECK (Categoria not like '%[^a-z]%'), 
  Constraint CK_Receita_Programacao CHECK (Programacao not like '%[^a-z]%'), 
  Constraint CK_Receita_Periodo CHECK (Periodo not like '%[^a-z]%'), 
  Constraint CK_Receita_Recebedor CHECK (Recebedor not like '%[^a-z]%'), 
); 

  

CREATE TABLE dbo.Despesa ( 
  CodDespesa int identity(1,1) Not Null , 
  CodConta int Not Null ,
  CodUsuario int Not Null ,
  Valor numeric(10,2) Not Null , 
  Categoria varchar(45) Not Null , 
  AVista char(1) Not Null , 
  Programacao char(1) Not Null , 
  Periodo varchar(45) Not Null , 
  Destinatario varchar(45) Not Null, 
  Emitente varchar(45) Not Null, 
  Constraint PK_Despesa Primary Key Clustered (CodDespesa, CodConta, CodUsuario), 
  Constraint FK_Despesa_CodConta_CodUsuario Foreign Key (CodConta, CodUsuario)
    References dbo.Conta (CodConta, CodUsuario) On Delete Cascade on Update Cascade,
  /*Constraint CK_Despesa_Valor CHECK (Valor not like '%[^0-9]%'), */
  Constraint CK_Despesa_Categoria CHECK (Categoria not like '%[^a-z]%'), 
  /*Constraint CK_Despesa_AVista CHECK (Categoria not like '%[^a-z]%'), */
  Constraint CK_Despesa_Programacao CHECK (Programacao not like '%[^a-z]%'), 
  Constraint CK_Despesa_Periodo CHECK (Periodo not like '%[^a-z]%'), 
  Constraint CK_Despesa_Destinatario CHECK (Destinatario not like '%[^a-z]%'), 
  Constraint CK_Despesa_Emitente CHECK (Emitente not like '%[^a-z]%'), 
); 

CREATE TABLE dbo.Produto ( 
  CodProduto int identity(1,1) Not Null , 
  CodDespesa int Not Null ,
  CodConta int Not Null ,
  CodUsuario int Not Null ,
  Nome varchar(45) Not Null ,
  Valor numeric(10,2) Not Null , 
  Constraint PK_Produto Primary Key Clustered (CodProduto, CodDespesa, CodConta, CodUsuario), 
  Constraint FK_Produto_CodDespesa_CodConta_CodUsuario Foreign Key (CodDespesa, CodConta, CodUsuario)
    References dbo.Despesa (CodDespesa, CodConta, CodUsuario) On Delete Cascade on Update Cascade,
  Constraint CK_Produto_Nome CHECK (Nome not like '%[^a-z]%'), 
); 