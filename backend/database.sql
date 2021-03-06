USE [master]
GO
/****** Object:  Database [archiveKnopka]    Script Date: 14.05.2020 15:56:09 ******/
CREATE DATABASE [archiveKnopka]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'aprchiveKnopka', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.DEVELOPER\MSSQL\DATA\aprchiveKnopka.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'aprchiveKnopka_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.DEVELOPER\MSSQL\DATA\aprchiveKnopka_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [archiveKnopka] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [archiveKnopka].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [archiveKnopka] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [archiveKnopka] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [archiveKnopka] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [archiveKnopka] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [archiveKnopka] SET ARITHABORT OFF 
GO
ALTER DATABASE [archiveKnopka] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [archiveKnopka] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [archiveKnopka] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [archiveKnopka] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [archiveKnopka] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [archiveKnopka] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [archiveKnopka] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [archiveKnopka] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [archiveKnopka] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [archiveKnopka] SET  DISABLE_BROKER 
GO
ALTER DATABASE [archiveKnopka] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [archiveKnopka] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [archiveKnopka] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [archiveKnopka] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [archiveKnopka] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [archiveKnopka] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [archiveKnopka] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [archiveKnopka] SET RECOVERY FULL 
GO
ALTER DATABASE [archiveKnopka] SET  MULTI_USER 
GO
ALTER DATABASE [archiveKnopka] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [archiveKnopka] SET DB_CHAINING OFF 
GO
ALTER DATABASE [archiveKnopka] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [archiveKnopka] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [archiveKnopka] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'archiveKnopka', N'ON'
GO
ALTER DATABASE [archiveKnopka] SET QUERY_STORE = OFF
GO
USE [archiveKnopka]
GO
/****** Object:  User [archiveClient]    Script Date: 14.05.2020 15:56:09 ******/
CREATE USER [archiveClient] FOR LOGIN [archiveClient] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [archiveClient]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [archiveClient]
GO
ALTER ROLE [db_datareader] ADD MEMBER [archiveClient]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [archiveClient]
GO
/****** Object:  Table [dbo].[documents]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[documents](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[owner] [int] NOT NULL,
	[name] [text] NOT NULL,
	[src] [varchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[feedbacks]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feedbacks](
	[idClient] [int] NOT NULL,
	[feedbackText] [text] NOT NULL,
	[date] [date] NOT NULL,
	[rating] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idClient] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[messages]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[messages](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[srcUser] [int] NOT NULL,
	[dstUser] [int] NOT NULL,
	[messageText] [text] NOT NULL,
	[timeStamp] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[requests]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[requests](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[srcId] [int] NOT NULL,
	[text] [text] NOT NULL,
	[type] [varchar](30) NOT NULL,
	[status] [varchar](30) NOT NULL,
	[timeStamp] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[login] [varchar](24) NOT NULL,
	[password] [varchar](99) NOT NULL,
	[name] [varchar](90) NOT NULL,
	[phone] [varchar](12) NOT NULL,
	[email] [varchar](30) NOT NULL,
	[type] [varchar](13) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[login] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[requests] ADD  CONSTRAINT [DF_requests_status]  DEFAULT ('На рассмотрении') FOR [status]
GO
ALTER TABLE [dbo].[documents]  WITH CHECK ADD  CONSTRAINT [owner] FOREIGN KEY([owner])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[documents] CHECK CONSTRAINT [owner]
GO
ALTER TABLE [dbo].[feedbacks]  WITH CHECK ADD  CONSTRAINT [idClient] FOREIGN KEY([idClient])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[feedbacks] CHECK CONSTRAINT [idClient]
GO
ALTER TABLE [dbo].[messages]  WITH CHECK ADD  CONSTRAINT [dstUser] FOREIGN KEY([dstUser])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[messages] CHECK CONSTRAINT [dstUser]
GO
ALTER TABLE [dbo].[messages]  WITH CHECK ADD  CONSTRAINT [srcUser] FOREIGN KEY([srcUser])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[messages] CHECK CONSTRAINT [srcUser]
GO
ALTER TABLE [dbo].[requests]  WITH CHECK ADD  CONSTRAINT [srcId] FOREIGN KEY([srcId])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[requests] CHECK CONSTRAINT [srcId]
GO
ALTER TABLE [dbo].[feedbacks]  WITH CHECK ADD CHECK  (([rating]=(1) OR [rating]=(2) OR [rating]=(3) OR [rating]=(4) OR [rating]=(5)))
GO
ALTER TABLE [dbo].[requests]  WITH CHECK ADD CHECK  (([status]='Завершена' OR [status]='Выполняется' OR [status]='На рассмотрении'))
GO
ALTER TABLE [dbo].[requests]  WITH CHECK ADD CHECK  (([status]='Завершена' OR [status]='Выполняется' OR [status]='На рассмотрении'))
GO
ALTER TABLE [dbo].[requests]  WITH CHECK ADD CHECK  (([type]='Архивная обработка' OR [type]='Дезинфекция' OR [type]='Переплет' OR [type]='Электронный архив' OR [type]='Хранение' OR [type]='Уничтожение' OR [type]='Сканирование'))
GO
ALTER TABLE [dbo].[requests]  WITH CHECK ADD CHECK  (([type]='Архивная обработка' OR [type]='Дезинфекция' OR [type]='Переплет' OR [type]='Электронный архив' OR [type]='Хранение' OR [type]='Уничтожение' OR [type]='Сканирование'))
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD CHECK  (([type]='Администратор' OR [type]='Клиент'))
GO
/****** Object:  StoredProcedure [dbo].[auth]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[auth] 
	-- Add the parameters for the stored procedure here
	(@login varchar(24),
	@password varchar(99)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT login, type
	FROM users
	WHERE login=@login and password=@password
END
GO
/****** Object:  StoredProcedure [dbo].[changeData]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[changeData]
	-- Add the parameters for the stored procedure here
	(@login varchar(24),
	@oldLogin varchar(24),
	@password varchar(99),
	@name varchar(90),
	@phone varchar(12),
	@email varchar(30)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	IF((SELECT password FROM users WHERE login=@oldLogin)=@password)
	BEGIN
		IF((NOT EXISTS(SELECT * FROM users WHERE login=@login) OR (SELECT login FROM users WHERE login=@oldLogin)=@login)
		AND (NOT EXISTS(SELECT * FROM users WHERE email=@email) OR (SELECT email FROM users WHERE login=@oldlogin)=@email)
		AND (NOT EXISTS(SELECT * FROM users WHERE phone=@phone) OR (SELECT phone FROM users WHERE login=@oldlogin)=@phone))
			BEGIN
				UPDATE users SET login=@login, email=@email, phone=@phone, name=@name WHERE login=@oldLogin
				SELECT 0 AS res, login, type FROM users WHERE login=@login
			END
		ELSE
		SELECT 2 AS res
	END
	ELSE
	SELECT 1 AS res
END
GO
/****** Object:  StoredProcedure [dbo].[changePassword]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[changePassword]
	-- Add the parameters for the stored procedure here
	(@login varchar(24),
	@oldPassword varchar(99),
	@newPassword varchar(99)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	IF((SELECT password FROM users WHERE login=@login)=@oldPassword)
	BEGIN
	UPDATE users SET password = @newPassword WHERE login=@login
	SELECT 0 AS res
	END
	ELSE
	SELECT 1 AS res
END
GO
/****** Object:  StoredProcedure [dbo].[changeRequestStatus]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[changeRequestStatus] 
	-- Add the parameters for the stored procedure here
	(@id int, @status varchar(30))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	UPDATE requests SET status=@status WHERE id=@id
END
GO
/****** Object:  StoredProcedure [dbo].[checkExist]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[checkExist] 
	-- Add the parameters for the stored procedure here
	(
	@email varchar(30),
	@phone varchar(12),
	@login varchar(24)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		IF(EXISTS(SELECT * FROM users WHERE email=@email))
			BEGIN
				SELECT 1 AS res
				RETURN
			END
		IF(EXISTS(SELECT * FROM users WHERE phone=@phone))
			BEGIN
				SELECT 2 AS res
				RETURN
			END
		IF(EXISTS(SELECT * FROM users WHERE login=@login))
			BEGIN
				SELECT 3 AS res
				RETURN
			END
		SELECT 0 AS res
END
GO
/****** Object:  StoredProcedure [dbo].[getDataByLogin]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getDataByLogin] 
	-- Add the parameters for the stored procedure here
	(@login varchar(24))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT login, name, phone, email, type FROM users WHERE login=@login
END
GO
/****** Object:  StoredProcedure [dbo].[getDocuments]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getDocuments] 
	-- Add the parameters for the stored procedure here
	(@ids int)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT src, name FROM documents WHERE id in (@ids)
END
GO
/****** Object:  StoredProcedure [dbo].[getDocumentsByLogin]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getDocumentsByLogin](
    @login varchar(24)
)AS
    BEGIN
        SELECT documents.id, documents.name
		FROM [documents] left join users on (documents.owner=users.id)
		WHERE login=@login
    END
GO
/****** Object:  StoredProcedure [dbo].[getFeedbackByLogin]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getFeedbackByLogin](
@login varchar(24)
)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM feedbacks WHERE idClient=(SELECT id FROM users WHERE login=@login)
END
GO
/****** Object:  StoredProcedure [dbo].[getFeedbacks]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getFeedbacks]
	-- Add the parameters for the stored procedure here

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		SELECT login, feedbackText, rating, date FROM feedbacks LEFT JOIN users ON (idClient=id)
END
GO
/****** Object:  StoredProcedure [dbo].[getReceivedMessages]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getReceivedMessages] 
	-- Add the parameters for the stored procedure here
	(@login varChar(24))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT login, messageText, timeStamp
	FROM messages left join users on (srcUser=users.id)
	WHERE dstUser=(SELECT id FROM users WHERE login=@login) ORDER BY (timeStamp) DESC
END
GO
/****** Object:  StoredProcedure [dbo].[getRequests]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getRequests]
AS
    BEGIN
        SELECT requests.id, requests.text, requests.type, requests.status, requests.timeStamp, users.name, users.phone, users.email, users.login
		FROM [requests] LEFT JOIN users ON (srcId=users.id) ORDER BY (timeStamp) DESC
    END
GO
/****** Object:  StoredProcedure [dbo].[getRequestsByLogin]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getRequestsByLogin](
    @login varchar(24)
)AS
    BEGIN
        SELECT requests.id, requests.text, requests.type, requests.status, requests.timeStamp
		FROM [requests] left join users on (requests.srcId=users.id)
		WHERE login=@login
		ORDER BY (timeStamp) DESC
    END
GO
/****** Object:  StoredProcedure [dbo].[getRequestStatusById]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getRequestStatusById]
	-- Add the parameters for the stored procedure here
	(@id int)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT id, status
	FROM dbo.requests
	WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[getSendMessages]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getSendMessages] 
	-- Add the parameters for the stored procedure here
	(@login varChar(24))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT login, messageText, timeStamp
	FROM messages left join users on (dstUser=users.id)
	WHERE srcUser=(SELECT id FROM users WHERE login=@login) ORDER BY (timeStamp) DESC
END
GO
/****** Object:  StoredProcedure [dbo].[getUsersList]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getUsersList] 
(@type varchar(13))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT login FROM users WHERE type!=@type
END
GO
/****** Object:  StoredProcedure [dbo].[registerNewUser]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[registerNewUser] (
	-- Add the parameters for the stored procedure here
	@login varchar(24), 
	@password varchar(99), 
	@name varchar(90), 
	@phone varchar(12), 
	@email varchar(30), 
	@type varchar(13))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO users VALUES(@login, @password, @name, @phone, @email, @type)
END
GO
/****** Object:  StoredProcedure [dbo].[restorePassword]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[restorePassword]
	-- Add the parameters for the stored procedure here
	(@email varchar(30),
	@password varchar(99))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		IF(EXISTS(SELECT * FROM users WHERE email=@email))
			BEGIN
			UPDATE users SET password=@password WHERE email=@email
			SELECT 0 AS res,login, name FROM users WHERE email=@email
			END
		ELSE
			SELECT 1 AS res
END
GO
/****** Object:  StoredProcedure [dbo].[sendFeedback]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sendFeedback] 
	-- Add the parameters for the stored procedure here
	(@login varchar(24),
	@rating int,
	@text text)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF (NOT EXISTS(SELECT * FROM feedbacks WHERE idClient=(SELECT id FROM users WHERE login=@login)))
		BEGIN
			INSERT INTO feedbacks VALUES((SELECT id FROM users WHERE login=@login), @text, GETDATE(), @rating)
		END
	ELSE
		BEGIN
			UPDATE feedbacks SET feedbackText=@text, rating=@rating, date=GETDATE() WHERE idClient=(SELECT id FROM users WHERE login=@login)
		END
END
GO
/****** Object:  StoredProcedure [dbo].[sendMessage]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sendMessage] 
	-- Add the parameters for the stored procedure here
	(@loginSRC varChar(24),
	@loginDST varChar(24),
	@text text)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO messages(srcUser, dstUser, messageText, timeStamp) VALUES((SELECT id FROM users WHERE login=@loginSRC), (SELECT id FROM users WHERE login=@loginDST), @text, GETUTCDATE())
END
GO
/****** Object:  StoredProcedure [dbo].[sendRequest]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sendRequest]
	-- Add the parameters for the stored procedure here
	(@login varchar(24), 
	@text text,
	@type varchar(20))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	INSERT INTO dbo.requests(srcId, text, type, timeStamp) VALUES((
	SELECT id 
	FROM dbo.users
	WHERE users.login=@login), @text, @type, GETUTCDATE())
	SELECT TOP 1 requests.id, email, name, timeStamp
	FROM requests LEFT JOIN users ON (requests.srcId=users.id)
	WHERE login=@login ORDER BY (timeStamp) DESC
	
END
GO
/****** Object:  StoredProcedure [dbo].[sendUnauthorizedRequest]    Script Date: 14.05.2020 15:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sendUnauthorizedRequest] 
	-- Add the parameters for the stored procedure here
	(
	@login varchar(24),
	@password varchar(99),
	@name varchar(90),
	@email varchar(30),
	@phone varchar(12),
	@type varchar(30),
	@comment text)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	IF((SELECT id FROM users WHERE email=@email)!=(SELECT id FROM users WHERE phone=@phone))
			BEGIN
				SELECT 2 AS res
				RETURN
			END
	IF(EXISTS(SELECT * FROM users WHERE email=@email AND phone=@phone))
	BEGIN
		INSERT INTO requests(srcId, text, type, status, timeStamp) VALUES((SELECT id FROM users WHERE email=@email and phone=@phone), @comment, @type, 'На рассмотрении', GETUTCDATE())
		SELECT 1 AS res, requests.id AS id, name AS name FROM requests LEFT JOIN users ON (srcId=users.id)
	WHERE email=@email and phone=@phone ORDER BY timeStamp DESC
	END
	IF(NOT EXISTS(SELECT * FROM users WHERE email=@email AND phone=@phone))
	BEGIN
		IF(NOT EXISTS(SELECT * FROM users WHERE email=@email))
		BEGIN
			IF(NOT EXISTS(SELECT * FROM users WHERE phone=@phone))
			BEGIN
				INSERT INTO users(login, password, name, phone, email, type) VALUES(@login, @password, @name, @phone, @email, 'Клиент');
				INSERT INTO requests(srcId, text, type, status, timeStamp) VALUES((SELECT id FROM users WHERE login=@login), @comment, @type, 'На рассмотрении', GETUTCDATE())
				SELECT 0 AS res, id FROM requests WHERE srcId=(SELECT id FROM users WHERE email=@email and phone=@phone) ORDER BY timeStamp
			END
			ELSE
			SELECT 3 AS res
		END
		ELSE
		SELECT 4 AS res
	END	
END
GO
USE [master]
GO
ALTER DATABASE [archiveKnopka] SET  READ_WRITE 
GO
