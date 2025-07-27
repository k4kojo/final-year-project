CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"appointment_date" timestamp with time zone NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_room_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"message_type" varchar DEFAULT 'text' NOT NULL,
	"file_url" varchar,
	"reply_to" uuid,
	"reply_message_type" varchar,
	"reply_file_url" varchar,
	"reply_content" varchar
);
--> statement-breakpoint
CREATE TABLE "chat_rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "doctor_availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"doctor_id" uuid NOT NULL,
	"available_from" timestamp with time zone NOT NULL,
	"available_to" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "doctor_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"specialization" varchar NOT NULL,
	"license_number" varchar NOT NULL,
	"bio" varchar,
	"reviews" real DEFAULT 0 NOT NULL,
	"rating" real DEFAULT 0 NOT NULL,
	"experience_years" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "doctor_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "lab_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"appointment_id" uuid NOT NULL,
	"test_name" varchar NOT NULL,
	"result" varchar NOT NULL,
	"result_date" timestamp with time zone NOT NULL,
	"notes" varchar,
	"file_url" varchar,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "medical_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"record_type" text NOT NULL,
	"description" varchar NOT NULL,
	"file_url" varchar,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"type" text NOT NULL,
	"message" varchar NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"is_global" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"appointment_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" real NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"provider_ref" varchar,
	"method" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "prescriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"appointment_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"medication" varchar NOT NULL,
	"dosage" varchar NOT NULL,
	"frequency" varchar NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"instructions" text,
	"file_url" varchar,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"rating" real NOT NULL,
	"comment" varchar,
	"appointment_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"activity_type" text NOT NULL,
	"activity_details" varchar,
	"timestamp" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"feedback" varchar NOT NULL,
	"rating" real NOT NULL,
	"category" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone_number" integer NOT NULL,
	"profile_picture" varchar DEFAULT null,
	"role" text DEFAULT 'patient' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verification_token" varchar DEFAULT null,
	"verification_token_expiry" timestamp with time zone DEFAULT null,
	"reset_token" varchar DEFAULT null,
	"reset_token_expiry" timestamp with time zone DEFAULT null,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"notification_enabled" boolean DEFAULT true NOT NULL,
	"dark_mode" boolean DEFAULT false NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_settings_user_id_unique" UNIQUE("user_id")
);
