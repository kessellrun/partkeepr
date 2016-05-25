<?php

/* @Framework/Form/collection_widget.html.php */
class __TwigTemplate_f3576f16f2813e490b5477fc32f34760441137e711385470c0225a379544861d extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_0392dd799ead2b0d2dc5ee7295cbabc019965a95b43cfa3766a8c4c3b7a0e5bf = $this->env->getExtension("native_profiler");
        $__internal_0392dd799ead2b0d2dc5ee7295cbabc019965a95b43cfa3766a8c4c3b7a0e5bf->enter($__internal_0392dd799ead2b0d2dc5ee7295cbabc019965a95b43cfa3766a8c4c3b7a0e5bf_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/collection_widget.html.php"));

        // line 1
        echo "<?php if (isset(\$prototype)): ?>
    <?php \$attr['data-prototype'] = \$view->escape(\$view['form']->row(\$prototype)) ?>
<?php endif ?>
<?php echo \$view['form']->widget(\$form, array('attr' => \$attr)) ?>
";
        
        $__internal_0392dd799ead2b0d2dc5ee7295cbabc019965a95b43cfa3766a8c4c3b7a0e5bf->leave($__internal_0392dd799ead2b0d2dc5ee7295cbabc019965a95b43cfa3766a8c4c3b7a0e5bf_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/collection_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if (isset($prototype)): ?>*/
/*     <?php $attr['data-prototype'] = $view->escape($view['form']->row($prototype)) ?>*/
/* <?php endif ?>*/
/* <?php echo $view['form']->widget($form, array('attr' => $attr)) ?>*/
/* */
