"use strict";

var pedido = function () {

    var self = {};

    self.initialize = function () {
        this.configuracoes();
        bindPedido();
        bindConfirmarPedido();
        bindRemoverItem();
        bindCancelarPedido();
        bindLeitorQRCode();
        bindFinalizarPedido();
    };

    self.configuracoes = function () {
        $(".modal").modal();
    };

    var bindPedido = function () {

        $(".collection").on("click", ".collection-item", function () {
            var $badge = $('.badge', this);

            if ($badge.length === 0) {
                $badge = $("<span class='badge brown-text'>0</span>").appendTo(this);
            }

            $badge.text(parseInt($badge.text()) + 1);

            var nomeProduto = this.firstChild.textContent;
            Materialize.toast(nomeProduto + " adicionado", 1000);
        });
    };

    var bindConfirmarPedido = function () {

        $("#confirmar").on("click", function () {
            var texto = "";

            $(".badge").parent().each(function () {
                texto += this.firstChild.textContent + ": ";
                texto += this.lastChild.textContent + ", ";
            });

            $("#resumo").empty().text(texto);
        });
    };

    var bindRemoverItem = function () {

        $(".collection").on("click", ".badge", function () {
            $(this).remove();
            return false;
        });
    };

    var bindCancelarPedido = function () {
        $(".acao-limpar").on("click", function () {
            $("#numero-mesa").val("");
            $(".badge").each(function () {
                $(this).remove();
            });
        });
    };

    var bindLeitorQRCode = function () {
        $('.scan-qrcode').on('click', function () {
            cordova.plugins.barcodeScanner.scan(function (resultado) {
                Materialize.toast("Mesa: " + resultado.text, 4000);
                $(".numero-mesa"), val(resultado.text);
            });
        }, function (error) {
            Materialize.toast(error.text, 2000, "red-text");
        });
    };

    var bindFinalizarPedido = function () {

        $("#btnFinalizarPedido").on("click", function () {
            $.ajax({
                url: "http://cozinhapp.sergiolopes.org/novo-pedido",
                data: {
                    mesa: $("#numero-mesa").val(),
                    pedido: $("#resumo").text()
                },
                success: function (dados) {
                    Materialize.toast(dados, 2000);
                    $("#numero-mesa").val('');
                    $("resumo").text('');
                },
                error: function (error)
                {
                    Materialize.toast(error.responseText, 3000, 'red-text');
                }
            });
        });

    };

    return self;

};

new pedido().initialize();