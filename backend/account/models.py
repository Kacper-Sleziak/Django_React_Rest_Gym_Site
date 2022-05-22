from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.password_validation import validate_password


class AccountManager(BaseUserManager):

    def create_user(
            self,
            email,
            nickname,
            first_name,
            last_name,
            password=None):

        user = self.model(
            email=self.normalize_email(email),
            nickname=nickname,
            last_name=last_name,
            first_name=first_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
            self,
            email,
            nickname,
            first_name,
            last_name,
            password):

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            nickname=nickname,
            last_name=last_name,
            first_name=first_name
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    nickname = models.CharField(
        verbose_name="nick",
        max_length=30,
        unique=True)
    first_name = models.CharField(
        verbose_name="first_name",
        max_length=30,
        unique=False,
        blank=True,
        null=True)
    last_name = models.CharField(
        verbose_name="last_name",
        max_length=30,
        unique=False,
        blank=True,
        null=True)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname', 'first_name', 'last_name']

    objects = AccountManager()

    def __str__(self):
        return self.nickname

    @property
    def full_name(self):
        full_name = str(self.nickname + " " + self.last_name)
        return full_name

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
